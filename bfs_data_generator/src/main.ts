export async function main(): Promise<void> {
  process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
}

main().catch(console.error);
