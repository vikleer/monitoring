import { parse } from "csv-parse";
import { createReadStream } from "node:fs";
import { finished } from "node:stream/promises";

/**
 * Reads a CSV file and returns an array of objects representing the records.
 *
 * @param path - The path to the CSV file.
 * @returns A promise that resolves to an array of objects representing the records.
 */
export async function readcsv<T>(path: string): Promise<T[]> {
  const records: T[] = [];
  const parser = createReadStream(path).pipe(parse({ columns: true }));

  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });

  await finished(parser);

  return records;
}
