import { getDataSourceOptions } from "@src/database/data-source";
import { registerAs } from "@nestjs/config";

export default registerAs("database", () => getDataSourceOptions());
