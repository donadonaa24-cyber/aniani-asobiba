(function (root, factory) {
    const catalog = factory();
    root.AnianiTrialGachaData = catalog;
    if (typeof module === "object" && module.exports) module.exports = catalog;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    let number = 0;
    const cards = [];

    function add(work, rarity, category, title, image, extra = {}) {
        number += 1;
        cards.push({
            id: `${work === "Battle a la carte" ? "BAL" : "KUU"}-${String(number).padStart(3, "0")}`,
            no: number,
            work,
            rarity,
            category,
            title,
            image,
            ...extra
        });
    }

    const materials = [
        ["お米", "rice.png"], ["たまご", "egg.png"], ["にんじん", "carrot.png"],
        ["たまねぎ", "onion.png"], ["じゃがいも", "potato.png"], ["キャベツ", "cabbage.png"],
        ["だいこん", "daikon.png"], ["のり", "nori.png"], ["バナナ", "banana.png"],
        ["牛乳", "milk.png"], ["牛肉", "beef.png"], ["豚肉", "pork.png"],
        ["鶏肉", "chicken.png"], ["魚", "fish.png"], ["カレー粉", "curry.png"]
    ];
    materials.forEach(([title, file]) => add("Battle a la carte", "C", "素材", title, `assets/images/cards/${file}`));

    const recipes = [
        ["おにぎり", "onigiri.png"], ["チャーハン", "chahan.png"], ["カレーライス", "curry-rice.png"],
        ["オムライス", "omurice.png"], ["肉じゃが", "nikujaga.png"], ["ハンバーグ", "hamburg-steak.png"],
        ["クリームシチュー", "cream-stew.png"], ["ロールキャベツ", "roll-cabbage.png"],
        ["野菜炒め", "yasai-itame.png"], ["ぶり大根", "buri-daikon.png"],
        ["キーマカレー", "keema-curry.png"], ["豪華チャーハン", "gorgeous-chahan.png"]
    ];
    recipes.forEach(([title, file]) => add("Battle a la carte", "SR", "料理", title, `assets/images/recipes/${file}`));

    const events = [
        ["爆買い", "bakugai.png"], ["ゴミ収集車", "gomi-shushu-sha.png"],
        ["緊急調理", "kinkyu-chori.png"], ["物々交換", "monomono-kokan.png"],
        ["お掃除", "osouji.png"], ["食材探索", "shokuzai-tansaku.png"],
        ["創作料理", "sousaku-ryouri.png"], ["やっぱやめた", "yappa-yameta.png"],
        ["やり直し", "yarinaoshi.png"]
    ];
    events.forEach(([title, file]) => add("Battle a la carte", "SSR", "イベント", title, `assets/images/events/${file}`));

    [
        ["暁", "akatsuki"], ["千鶴", "chizuru"], ["舞", "mai"], ["匠", "takumi"]
    ].forEach(([title, file]) => add("Battle a la carte", "UR", "キャラクター", title, `assets/images/battle-mode-icons/${file}-battle-mode-icon.png`));

    const vehicleSheet = "images/gacha/transport-vehicles.png";
    [
        ["フォークリフト", "SR", 0], ["2トントラック", "C", 1], ["4トントラック", "SR", 2],
        ["10トントラック", "SSR", 3], ["20トントレーラー", "UR", 4]
    ].forEach(([title, rarity, column]) => add("架空運輸", rarity, "車両", title, vehicleSheet, {
        sprite: { columns: 5, rows: 1, column, row: 0 }
    }));

    const transportAssets = "images/gacha";
    add("架空運輸", "UR", "社員", "社長", `${transportAssets}/company-president.png`, { role: "代表取締役" });
    add("架空運輸", "SSR", "社員", "東営業所長", `${transportAssets}/company-manager-east.png`, { role: "営業所長" });
    add("架空運輸", "SSR", "社員", "中央営業所長", `${transportAssets}/company-manager-central.png`, { role: "営業所長" });
    add("架空運輸", "SSR", "社員", "西営業所長", `${transportAssets}/company-manager-west.png`, { role: "営業所長" });
    add("架空運輸", "SR", "社員", "営業チーム", `${transportAssets}/company-sales.png`, { role: "営業主任チーム" });
    add("架空運輸", "C", "社員", "輸送チーム", `${transportAssets}/company-team.png`, { role: "輸送担当チーム" });

    const employeeSheet = "images/gacha/transport-employees.png";
    const employees = [
        ["青木 晃", "配送ドライバー", "C"], ["佐々木 美咲", "配送ドライバー", "C"],
        ["黒田 誠", "安全管理責任者", "SSR"], ["山本 悠斗", "倉庫作業員", "C"],
        ["水野 明日香", "配車オペレーター", "SR"], ["高橋 奈緒", "営業事務", "C"],
        ["岡田 剛", "整備主任", "SR"], ["中村 蓮", "倉庫担当", "C"],
        ["小林 葵", "倉庫担当", "C"], ["藤原 修", "物流顧問", "SSR"],
        ["石井 隆", "フォークリフト主任", "SR"], ["田中 里奈", "配車主任", "SR"],
        ["松本 颯太", "営業主任", "SR"], ["斎藤 結衣", "検品担当", "C"],
        ["森 健介", "整備担当", "C"], ["吉田 慎一", "営業所長", "SSR"],
        ["清水 彩", "在庫管理主任", "SR"], ["井上 博", "安全教育主任", "SR"],
        ["木村 拓海", "配送担当", "C"], ["林 由佳", "総務担当", "C"],
        ["池田 翼", "配送担当", "C"], ["橋本 千尋", "現場主任", "SR"],
        ["山口 恵", "経理担当", "C"], ["前田 大輔", "整備班長", "SR"],
        ["近藤 ひなた", "配送担当", "C"], ["遠藤 茂", "ベテランドライバー", "SR"],
        ["坂本 沙耶", "採用担当", "C"], ["村上 直哉", "統括部長", "UR"],
        ["石川 亮", "現場責任者", "SSR"], ["福田 真紀", "総務部長", "SSR"]
    ];
    employees.forEach(([title, role, rarity], index) => add("架空運輸", rarity, "社員", title, employeeSheet, {
        role,
        sprite: { columns: 5, rows: 6, column: index % 5, row: Math.floor(index / 5) }
    }));

    return Object.freeze({
        version: 1,
        storageKey: "aniani.trial-gacha.v1.inventory",
        rates: Object.freeze({ C: 60, SR: 25, SSR: 10, UR: 5 }),
        cards: Object.freeze(cards.map((card) => Object.freeze(card)))
    });
});
