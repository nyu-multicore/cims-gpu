import * as FS from "fs-extra";
import * as Path from "path";
import { OUT_DIR } from "./@paths";

const GRAPH_SIZE = Number(process.env.GRAPH_SIZE || 1000);
const SAMPLES = Number(process.env.SAMPLES || 100);
const MAX_DEGREE = Number(process.env.MAX_DEGREE || GRAPH_SIZE);

function generateGraph(): number[][] {
  const graph: number[][] = [];
  for (let i = 0; i < GRAPH_SIZE; i++) {
    graph.push([]);
    for (let j = 0; j < Math.floor(Math.random() * MAX_DEGREE); j++) {
      const neighbor = Math.floor(Math.random() * GRAPH_SIZE);
      if (neighbor !== i && !graph[i].includes(neighbor)) {
        graph[i].push(neighbor);
      }
    }
    graph[i].sort((a, b) => a - b);
  }
  return graph;
}

export async function main(): Promise<void> {
  await FS.ensureDir(OUT_DIR);
  const outPath = Path.join(OUT_DIR, `graph_d${GRAPH_SIZE}_s${SAMPLES}.txt`);
  console.log(`Writing to ${outPath}, generating ${SAMPLES} graphs...`);
  await FS.writeFile(outPath, `${SAMPLES}\n`);
  for (let i = 0; i < SAMPLES; i++) {
    const graph = generateGraph();
    let data = `${graph.length}\n`;
    for (const node of graph) {
      data += `${node.length} ${node.join(" ")}\n`;
    }
    await FS.appendFile(outPath, data);
    console.log(`Generated sample ${i + 1} of ${SAMPLES}.`);
  }
  console.log("- Done.");
}

main().catch(console.error);
