const assert = require('node:assert/strict');
const fs = require('node:fs');
const manifest = require('./anibato/downloads.json');
const root = fs.readFileSync('index.html', 'utf8');
const intro = fs.readFileSync('anibato/index.html', 'utf8');
const section = intro.match(/<section id="downloads"[\s\S]*?<\/section>/)?.[0];
assert(section, 'download section has a stable destination');
assert.equal(manifest.version, 'v0.1.2-trial.20261024');
assert.equal(manifest.androidDeviceVerified, false);
const base = `https://github.com/donadonaa24-cyber/aniani-battle/releases/download/${manifest.version}/`;
assert.deepEqual(manifest.files.map(f => f.name), [
  `AniBato-Windows-x64-${manifest.version}.zip`, 'AniBato-Android-arm64-v0.1.2-trial.20261024.apk'
]);
assert.deepEqual(manifest.files.map(f => f.bytes), [205149208,162327300]);
for (const file of manifest.files) {
  const fileBase = `https://github.com/donadonaa24-cyber/aniani-battle/releases/download/${file.version}/`;
  assert.equal(file.version, manifest.version);
  assert.equal(file.url, fileBase + file.name);
  assert.match(file.sha256, /^[a-f0-9]{64}$/);
  assert(file.bytes > 0 && file.bytes < 2 ** 31);
  assert.equal(root.split(`href="${file.url}"`).length - 1, 2, 'works and detail both offer the package');
  assert.equal(section.split(`href="${file.url}"`).length - 1, 1, 'intro offers the same exact package');
  assert(section.includes(`約${Math.round(file.bytes / 1e6)}MB`));
}
for (const [key, name] of [['checksums', 'SHA256SUMS.txt'], ['readme', 'README.txt']]) {
  assert.equal(manifest[key], base + name);
  assert(section.includes(`href="${manifest[key]}"`));
}
for (const text of ['すべて展開', '約277MB', 'AniBato.exe', 'DataフォルダやDLL', 'Android 8.0以降', '64bit ARM', '試作用署名', '実機', '未確認', '招待対戦はブラウザ版で']) assert(section.includes(text), text);
assert.equal((root.match(/href="anibato\/#downloads"/g) || []).length, 2);
assert(!/href="(?:file:|[A-Z]:|[^"\n]*\.exe(?:[?#][^"]*)?)"/.test(root + intro), 'no local path or executable link');
assert(!/sb_secret_|service_role|supabaseKey|publishableKey/.test(JSON.stringify(manifest)));
console.log('PASS: 2 platforms × 3 entry points, exact release allowlist, sizes/SHA, installation steps and browser-only online.');

assert.equal(manifest.priorAndroidStartupReport.version,'v0.1.0-trial.20261023');
assert.equal(manifest.windowsExtractedBytes,276883383);
for(const text of ['スティック','丸ボタン','操作・HUDの配置','不透明度','変更を破棄','初期配置へ','ユーザー','更新版の実機操作']) assert(intro.includes(text),text);
