let content = $resource.content;
let lines = content.split(/\r?\n/);
let result = [];

for (let line of lines) {
    line = line.trim();

    if (!line || line.startsWith("#") || line === "payload:") {
        continue;
    }

    line = line.replace(/^-\s*/, "").trim();
    line = line.replace(/^['"]|['"]$/g, "");

    if (!line) continue;

    if (line.startsWith("+.")) {
        result.push("host-suffix," + line.substring(2));
    } else if (/^[0-9a-fA-F:.]+\/\d+$/.test(line)) {
        if (line.includes(":")) {
            result.push("ip6-cidr," + line);
        } else {
            result.push("ip-cidr," + line);
        }
    } else {
        result.push("host," + line);
    }
}

$done({
    content: result.join("\n")
});
