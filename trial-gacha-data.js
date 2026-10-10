(function (root, factory) {
    const catalog = factory();
    root.AnianiTrialGachaData = catalog;
    if (typeof module === "object" && module.exports) module.exports = catalog;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    const prefixes = { "Battle a la carte": "BAL", "架空運輸": "KUU", "星の終わりに君は生きる": "HOS", "花散るさきの、幸せのかたち": "HAN", "EchoShion": "ECH" };
    let number = 0;
    const cards = [];

    function add(work, rarity, category, title, image, extra = {}) {
        number += 1;
        cards.push({
            id: `${prefixes[work]}-${String(number).padStart(3, "0")}`,
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
        ["暁", "akatsuki", "先に流れを取るのは俺だ。"],
        ["千鶴", "chizuru", "最後に勝つのは私だから。"],
        ["舞依", "mai", "この一皿で、勝負を決めるよ！"],
        ["拓海", "takumi", "最高の一皿、完成だ！"]
    ].forEach(([title, file, quote]) => add(
        "Battle a la carte",
        "UR",
        "キャラクター",
        title,
        `assets/images/battle-mode-cutins/${file}-battle-mode-cutin.png`,
        { quote, character: file }
    ));

    const vehicleSheet = "images/gacha/transport-vehicles.png";
    [
        ["フォークリフト", "SR", 0], ["2トントラック", "C", 1], ["4トントラック", "SR", 2],
        ["10トントラック", "SSR", 3], ["20トントレーラー", "UR", 4]
    ].forEach(([title, rarity, column]) => add("架空運輸", rarity, "車両", title, vehicleSheet, {
        sprite: { columns: 5, rows: 1, column, row: 0 },
        ...(rarity === "UR" ? { quote: "最大級の積載で、道をつなぐ。" } : {})
    }));

    const transportAssets = "images/gacha";
    add("架空運輸", "UR", "社員", "社長", `${transportAssets}/company-president.png`, { role: "代表取締役", quote: "安全を積み重ね、未来まで届けます。" });
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
        ["坂本 沙耶", "採用担当", "C"], ["村上 直哉", "統括部長", "UR", "全拠点、予定どおり動かします。"],
        ["石川 亮", "現場責任者", "SSR"], ["福田 真紀", "総務部長", "SSR"]
    ];
    employees.forEach(([title, role, rarity, quote], index) => add("架空運輸", rarity, "社員", title, employeeSheet, {
        role,
        ...(quote ? { quote } : {}),
        sprite: { columns: 5, rows: 6, column: index % 5, row: Math.floor(index / 5) }
    }));

    // 既存81枚のIDとデータは維持し、新しい作品は末尾へ追加する。
    add("星の終わりに君は生きる", "UR", "登場人物", "透真", "images/gacha/bunko/touma.png", {"portrait": true, "role": "湊の兄", "description": "弟を思う気持ちを抱えながら、管理AIに守られた世界で自分の道を歩む。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hoshi", "quote": "弟を思う気持ちを抱えながら、管理AIに守られた世界で自分の道を歩む。", "quoteLabel": "登場人物紹介"});
    add("星の終わりに君は生きる", "UR", "登場人物", "湊", "images/gacha/bunko/minato.png", {"portrait": true, "role": "透真の弟", "description": "左目と左腕に機械を備え、仲間とともに生きる。工房で道具を手にする姿が、彼の人柄を伝える。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hoshi", "quote": "左目と左腕に機械を備え、仲間とともに生きる。工房で道具を手にする姿が、彼の人柄を伝える。", "quoteLabel": "登場人物紹介"});
    add("星の終わりに君は生きる", "SSR", "登場人物", "ハル", "images/gacha/bunko/haru.png", {"portrait": true, "role": "兄弟の家族", "description": "透真と湊と日々をともに過ごす犬。茶色と白の毛並みと赤い首輪が目印。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hoshi"});
    add("星の終わりに君は生きる", "SSR", "登場人物", "シロ", "images/gacha/bunko/shiro.png", {"portrait": true, "role": "犬型AI", "description": "白い体と青い瞳をもつ犬型AI。人とAIの関係を映す存在。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hoshi"});
    add("星の終わりに君は生きる", "SSR", "登場人物", "紗良", "images/gacha/bunko/sara.png", {"portrait": true, "role": "革命軍の仲間", "description": "仲間を支える、強さと優しさをあわせもつ女性。人の名前を記した手帳を大切にする。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hoshi"});
    add("花散るさきの、幸せのかたち", "UR", "登場人物", "咲", "images/gacha/bunko/saki.png", {"portrait": true, "role": "林家の姉", "description": "家族への思いと日々の暮らしが、姉妹の物語をつないでいく。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hanachiru", "quote": "家族への思いと日々の暮らしが、姉妹の物語をつないでいく。", "quoteLabel": "登場人物紹介"});
    add("花散るさきの、幸せのかたち", "UR", "登場人物", "花", "images/gacha/bunko/hana.png", {"portrait": true, "role": "咲の妹", "description": "丸い眼鏡と、結い上げた髪が印象的。姉とのつながりを抱え、自分の幸せを探していく。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hanachiru", "quote": "丸い眼鏡と、結い上げた髪が印象的。姉とのつながりを抱え、自分の幸せを探していく。", "quoteLabel": "登場人物紹介"});
    add("花散るさきの、幸せのかたち", "SSR", "登場人物", "エドワード", "images/gacha/bunko/edward.png", {"portrait": true, "role": "調査員", "description": "咲と花に関わる調査の仕事をする人物。姉妹に向き合い、物語を語る。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=hanachiru"});
    add("EchoShion", "UR", "登場人物", "朝倉志遠", "images/gacha/bunko/shion.png", {"portrait": true, "role": "澪の夫", "description": "物流の仕事をする澪の夫。みたらし団子が好きで、仕事帰りに甘いものを買うのが楽しみ。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=echoshion", "quote": "物流の仕事をする澪の夫。みたらし団子が好きで、仕事帰りに甘いものを買うのが楽しみ。", "quoteLabel": "登場人物紹介"});
    add("EchoShion", "UR", "登場人物", "朝倉澪", "images/gacha/bunko/mio.png", {"portrait": true, "role": "志遠の妻", "description": "おはぎとお茶を好む、穏やかな女性。日々の暮らしのなかで記憶と声に向き合う。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=echoshion", "quote": "おはぎとお茶を好む、穏やかな女性。日々の暮らしのなかで記憶と声に向き合う。", "quoteLabel": "登場人物紹介"});
    add("EchoShion", "UR", "登場人物", "EchoShion", "images/gacha/bunko/echoshion.png", {"portrait": true, "role": "端末の中の存在", "description": "志遠の記憶と声をもとに、端末の画面を通して澪と向き合う存在。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=echoshion", "quote": "志遠の記憶と声をもとに、端末の画面を通して澪と向き合う存在。", "quoteLabel": "登場人物紹介"});
    add("EchoShion", "C", "登場人物", "ECHO-Usa", "images/gacha/bunko/echo-usa.png", {"portrait": true, "role": "うさぎ型ECHO", "description": "まだ本物のうさぎを完全には再現できない、ぎこちない動きに近未来の日常がのぞく。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=echoshion"});
    add("EchoShion", "C", "登場人物", "人型ECHO", "images/gacha/bunko/echo-humanoid.png", {"portrait": true, "role": "暮らしを支えるロボット", "description": "スーパーなどで人の仕事を手伝う人型ロボット。商品を棚に並べる姿に、この世界の日常が表れている。", "bookUrl": "https://donadonaa24-cyber.github.io/book/#characters=echoshion"});

    return Object.freeze({
        version: 1,
        storageKey: "aniani.trial-gacha.v1.inventory",
        rates: Object.freeze({ C: 60, SR: 25, SSR: 10, UR: 5 }),
        cards: Object.freeze(cards.map((card) => Object.freeze(card)))
    });
});
