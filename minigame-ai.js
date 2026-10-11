(function (root, factory) {
    const api = factory();
    root.AnianiMiniGameAI = api;
    if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    // ミニゲームのCPU。〇×ゲーム（9×9・5目並べ）と神経衰弱の手を選ぶ。
    // 強さ: easy=やさしい / normal=ふつう / hard=つよい

    // ---- 〇×ゲーム（5目並べ） ----
    // 盤面上の「5マスの枠」ごとに、片方の石だけが入っている枠を数えて形勢を評価する。
    const WEIGHT = [0, 1, 14, 160, 3200, 10000000];
    const windowCache = new Map();

    function windowsFor(size, goal) {
        const key = `${size}:${goal}`;
        if (windowCache.has(key)) return windowCache.get(key);
        const windows = [];
        const byCell = Array.from({ length: size * size }, () => []);
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
                    const endX = col + dx * (goal - 1);
                    const endY = row + dy * (goal - 1);
                    if (endX < 0 || endX >= size || endY < 0 || endY >= size) continue;
                    const cells = [];
                    for (let step = 0; step < goal; step += 1) cells.push((row + dy * step) * size + col + dx * step);
                    const index = windows.length;
                    windows.push(cells);
                    cells.forEach((cell) => byCell[cell].push(index));
                }
            }
        }
        const result = { windows, byCell };
        windowCache.set(key, result);
        return result;
    }

    function countIn(board, cells, mark) {
        let mine = 0;
        let other = 0;
        for (const cell of cells) {
            const value = board[cell];
            if (!value) continue;
            if (value === mark) mine += 1;
            else other += 1;
        }
        return [mine, other];
    }

    function findWinLine(board, size, goal) {
        const { windows } = windowsFor(size, goal);
        for (const cells of windows) {
            const first = board[cells[0]];
            if (first && cells.every((cell) => board[cell] === first)) return cells.slice();
        }
        return [];
    }

    function evaluate(board, size, goal, me, opp) {
        const { windows } = windowsFor(size, goal);
        let score = 0;
        for (const cells of windows) {
            const [mine, other] = countIn(board, cells, me);
            if (mine && !other) score += WEIGHT[mine];
            else if (other && !mine) score -= WEIGHT[other];
        }
        return score;
    }

    // そのマスに置いたときの攻め（自分の枠が伸びる）と守り（相手の枠をふさぐ）の値。
    function moveScore(board, size, goal, cell, me, opp, defense = 0.95) {
        const { windows, byCell } = windowsFor(size, goal);
        let attack = 0;
        let guard = 0;
        for (const index of byCell[cell]) {
            const [mine, other] = countIn(board, windows[index], me);
            if (!other) attack += WEIGHT[mine + 1] - WEIGHT[mine];
            if (!mine && other) guard += WEIGHT[other + 1] - WEIGHT[other];
        }
        return attack + guard * defense;
    }

    function candidates(board, size, reach = 2) {
        const list = [];
        let hasStone = false;
        for (let cell = 0; cell < board.length; cell += 1) {
            if (board[cell]) { hasStone = true; continue; }
            const row = Math.floor(cell / size);
            const col = cell % size;
            let near = false;
            for (let dy = -reach; dy <= reach && !near; dy += 1) {
                for (let dx = -reach; dx <= reach; dx += 1) {
                    const y = row + dy;
                    const x = col + dx;
                    if (y < 0 || x < 0 || y >= size || x >= size) continue;
                    if (board[y * size + x]) { near = true; break; }
                }
            }
            if (near) list.push(cell);
        }
        if (!hasStone) {
            const center = Math.floor(size / 2);
            return [center * size + center];
        }
        return list.length ? list : board.map((value, cell) => (value ? -1 : cell)).filter((cell) => cell >= 0);
    }

    function winningCell(board, size, goal, mark) {
        const { windows } = windowsFor(size, goal);
        for (const cells of windows) {
            let mine = 0;
            let empty = -1;
            let blocked = false;
            for (const cell of cells) {
                if (board[cell] === mark) mine += 1;
                else if (!board[cell]) empty = cell;
                else { blocked = true; break; }
            }
            if (!blocked && mine === cells.length - 1 && empty >= 0) return empty;
        }
        return -1;
    }

    function ordered(board, size, goal, me, opp, limit) {
        return candidates(board, size)
            .map((cell) => ({ cell, score: moveScore(board, size, goal, cell, me, opp) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // つよい: 先読み（アルファベータ探索）。勝ち筋・受けを優先して候補を絞る。
    function search(board, size, goal, depth, alpha, beta, maximizing, cpu, human) {
        const toMove = maximizing ? cpu : human;
        const other = maximizing ? human : cpu;
        if (depth === 0) {
            // 末端でも、手番側の四（次で5つ）や相手の二重の四は勝敗として扱う。
            if (winningCell(board, size, goal, toMove) >= 0) return (maximizing ? 1 : -1) * 1e11;
            if (winningCells(board, size, goal, other).length >= 2) return (maximizing ? -1 : 1) * 1e11;
            return evaluate(board, size, goal, cpu, human);
        }
        const moves = ordered(board, size, goal, toMove, other, depth >= 3 ? 10 : 8);
        if (!moves.length) return 0;
        let best = maximizing ? -Infinity : Infinity;
        for (const { cell } of moves) {
            board[cell] = toMove;
            let value;
            if (findWinLineAt(board, size, goal, cell)) value = (maximizing ? 1 : -1) * (1e12 + depth);
            else value = search(board, size, goal, depth - 1, alpha, beta, !maximizing, cpu, human);
            board[cell] = "";
            if (maximizing) {
                if (value > best) best = value;
                if (best > alpha) alpha = best;
            } else {
                if (value < best) best = value;
                if (best < beta) beta = best;
            }
            if (alpha >= beta) break;
        }
        return best;
    }

    function findWinLineAt(board, size, goal, cell) {
        const { windows, byCell } = windowsFor(size, goal);
        const mark = board[cell];
        return byCell[cell].some((index) => windows[index].every((item) => board[item] === mark));
    }

    function winningCells(board, size, goal, mark) {
        const { windows } = windowsFor(size, goal);
        const cells = new Set();
        for (const window of windows) {
            let mine = 0;
            let empty = -1;
            let blocked = false;
            for (const cell of window) {
                if (board[cell] === mark) mine += 1;
                else if (!board[cell]) empty = cell;
                else { blocked = true; break; }
            }
            if (!blocked && mine === window.length - 1 && empty >= 0) cells.add(empty);
        }
        return [...cells];
    }

    // 四を作るマス（あと1つで5つ並ぶ形を作れるマス）。
    function fourMoves(board, size, goal, mark) {
        const { windows } = windowsFor(size, goal);
        const cells = new Set();
        for (const window of windows) {
            let mine = 0;
            const empties = [];
            let blocked = false;
            for (const cell of window) {
                if (board[cell] === mark) mine += 1;
                else if (!board[cell]) empties.push(cell);
                else { blocked = true; break; }
            }
            if (!blocked && mine === window.length - 2) empties.forEach((cell) => cells.add(cell));
        }
        return [...cells];
    }

    // 四を連続して打ち、相手に受けさせ続けて勝ち切る手順（VCF）を探す。見つかれば最初の一手を返す。
    function findVcf(board, size, goal, me, opp, depth = 12) {
        if (depth <= 0) return -1;
        if (winningCells(board, size, goal, opp).length) return -1;
        for (const cell of fourMoves(board, size, goal, me)) {
            board[cell] = me;
            const threats = winningCells(board, size, goal, me);
            let success = false;
            if (findWinLineAt(board, size, goal, cell) || threats.length >= 2) success = true;
            else if (threats.length === 1) {
                const reply = threats[0];
                board[reply] = opp;
                if (!findWinLineAt(board, size, goal, reply)) success = findVcf(board, size, goal, me, opp, depth - 1) >= 0;
                board[reply] = "";
            }
            board[cell] = "";
            if (success) return cell;
        }
        return -1;
    }

    function chooseGomokuMove(input, size, goal, me, opp, level = "normal", random = Math.random) {
        const board = input.slice();
        const pool = candidates(board, size);
        if (!board.some(Boolean)) {
            const center = Math.floor(size / 2);
            if (level === "hard") return center * size + center;
            const offset = () => Math.floor(random() * 3) - 1;
            return (center + offset()) * size + center + offset();
        }
        const win = winningCell(board, size, goal, me);
        if (win >= 0 && (level !== "easy" || random() < 0.75)) return win;
        const block = winningCell(board, size, goal, opp);
        if (block >= 0 && (level !== "easy" || random() < 0.55)) return block;

        if (level === "easy") {
            const scored = pool.map((cell) => ({ cell, score: moveScore(board, size, goal, cell, me, opp, 0.4) * (0.3 + random()) }))
                .sort((a, b) => b.score - a.score);
            const top = scored.slice(0, Math.min(7, scored.length));
            return top[Math.floor(random() * top.length)].cell;
        }
        if (level === "normal") {
            const scored = ordered(board, size, goal, me, opp, 4);
            const pick = scored.length > 1 && random() < 0.2 ? scored[1] : scored[0];
            return pick.cell;
        }
        // つよい: 自分の勝ち切り手順があれば打ち、相手の勝ち切り手順は先にふさぐ。
        const attack = findVcf(board, size, goal, me, opp);
        if (attack >= 0) return attack;
        const threat = findVcf(board, size, goal, opp, me);
        let choices = ordered(board, size, goal, me, opp, 12);
        if (threat >= 0) {
            const defenses = choices.map(({ cell }) => cell).filter((cell) => {
                board[cell] = me;
                const safe = findVcf(board, size, goal, opp, me) < 0;
                board[cell] = "";
                return safe;
            });
            if (!defenses.includes(threat) && !board[threat]) defenses.push(threat);
            choices = defenses.map((cell) => ({ cell }));
        }
        let bestCell = choices.length ? choices[0].cell : pool[0];
        let bestValue = -Infinity;
        for (const { cell } of choices) {
            board[cell] = me;
            const value = findWinLineAt(board, size, goal, cell)
                ? 1e13
                : search(board, size, goal, 3, -Infinity, Infinity, false, me, opp);
            board[cell] = "";
            if (value > bestValue) {
                bestValue = value;
                bestCell = cell;
            }
        }
        return bestCell;
    }

    // ---- 神経衰弱 ----
    // CPUがめくられたカードを覚える確率。つよいは一度見たカードをすべて覚える。
    const MEMORY_RECALL = { easy: 0.15, normal: 0.55, hard: 1 };

    function rememberCard(known, card, level = "normal", random = Math.random) {
        if (random() < (MEMORY_RECALL[level] ?? MEMORY_RECALL.normal)) known.set(card.id, card.pairKey);
    }

    function chooseMemoryPick(cards, known, level = "normal", firstId = null, random = Math.random) {
        const open = cards.filter((card) => !card.matched && !card.flipped);
        if (!open.length) return null;
        const pickRandom = (list) => list[Math.floor(random() * list.length)].id;
        if (level === "easy" && random() < 0.3) return pickRandom(open);
        const knownOpen = open.filter((card) => known.has(card.id));
        const unknown = open.filter((card) => !known.has(card.id));
        if (firstId) {
            const first = cards.find((card) => card.id === firstId);
            const partner = first && knownOpen.find((card) => known.get(card.id) === first.pairKey);
            if (partner) return partner.id;
            return unknown.length ? pickRandom(unknown) : pickRandom(open);
        }
        const groups = new Map();
        for (const card of knownOpen) {
            const key = known.get(card.id);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(card);
        }
        const pair = [...groups.values()].find((list) => list.length >= 2);
        if (pair) return pair[0].id;
        return unknown.length ? pickRandom(unknown) : pickRandom(open);
    }

    return Object.freeze({ findWinLine, chooseGomokuMove, rememberCard, chooseMemoryPick, evaluate });
});
