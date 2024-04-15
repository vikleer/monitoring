import { faker } from "@faker-js/faker";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";

export function generateFakeMonitoring(): Monitoring {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    subject: {
      id: faker.string.uuid(),
      name: faker.word.sample(),
    },
  };
}
