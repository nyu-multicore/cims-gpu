import * as FS from "fs-extra";
import * as Path from "path";
import { OUT_DIR } from "./@paths";

const GRAPH_SIZE = Number(process.env.GRAPH_SIZE || 1000);
const SAMPLES = Number(process.env.SAMPLES || 100);
const MAX_DEGREE = Number(process.env.MAX_DEGREE || GRAPH_SIZE);

function generateGraph(): number[][] {
  const graph: number[][] = [];
  for (let i = 0; i < GRAPH_SIZE; i++) {
    graph.push(new Array(GRAPH_SIZE).fill(0));
    for (let j = 0; j < Math.floor(Math.random() * MAX_DEGREE); j++) {
      const neighbor = Math.floor(Math.random() * GRAPH_SIZE);
      if (neighbor !== i) {
        graph[i][neighbor] = 1;
      }
    }
  }
  return graph;
}

export async function main(): Promise<void> {
  let data = `${SAMPLES}`;
  for (let i = 0; i < SAMPLES; i++) {
    const graph = generateGraph().flat();
    data += "\n" + graph.join(" ");
  }
  await FS.mkdirp(OUT_DIR);
  const outPath = Path.join(OUT_DIR, `graph_d${GRAPH_SIZE}_s${SAMPLES}.txt`);
  await FS.writeFile(outPath, data);
}

main().catch(console.error);
