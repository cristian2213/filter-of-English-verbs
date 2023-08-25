const fs = require("fs");
const rawVerbs = require("./all-verbs");

function mutateRow(rawVerbsP) {
  const filteredVerbs = [];

  const splittedVerbs = rawVerbsP.split("\n");
  const totalRows = splittedVerbs.length;

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const row = splittedVerbs[rowIndex];

    const splittedDefinition = row.split("@");

    const trimmedVerbs = splittedDefinition[0].trim();
    const trimmedSpanishDefinition = splittedDefinition[1].trim();

    const replacedSpaceByComma = trimmedVerbs.replaceAll(" ", ", ");
    const mergedDefinition = `${replacedSpaceByComma} @ ${trimmedSpanishDefinition}`;

    filteredVerbs.push(mergedDefinition);
  }

  return filteredVerbs;
}

const filteredVerbs = mutateRow(rawVerbs);

function writeFileSyncMode(content, name, fileType) {
  try {
    fs.writeFileSync(`${name}.${fileType}`, content);
  } catch (error) {
    console.error("Error writing file");
  }
}

const filteredVerbsInText = filteredVerbs.join("\n");
writeFileSyncMode(filteredVerbsInText, "list-of-400-verbs", "txt");
