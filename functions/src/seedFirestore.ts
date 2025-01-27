import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { faker } from "@faker-js/faker";

// Set emulator host before initializing
process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";

initializeApp({
  projectId: "habits-together",
});

const db = getFirestore();

// Helper functions for generating mock data
const getRandomEnumValue = <T extends string>(values: T[]): T =>
  values[Math.floor(Math.random() * values.length)];

const createMockUser = (id: string) => ({
  id,
  createdAt: new Date(),
  displayName: faker.person.fullName(),
  username: faker.internet.username(),
});

const createMockHabit = (id: string, userIds: string[]) => ({
  id,
  createdAt: new Date(),
  description: faker.lorem.sentence(),
  title: faker.lorem.words(3),
  goal: {
    period: getRandomEnumValue(["daily", "weekly"]),
    completionsPerPeriod: faker.number.int({ min: 1, max: 5 }),
  },
  icon: faker.image.url(),
  colorName: getRandomEnumValue(["red", "blue", "green", "yellow"]),
  participants: Object.fromEntries(
    userIds.map((userId) => [
      userId,
      {
        displayName: faker.person.fullName(),
        username: faker.internet.username(),
        mostRecentCompletionDate: faker.date.recent(),
        isOwner: userId === userIds[0],
      },
    ]),
  ),
});

const createMockNotification = (id: string, userIds: string[]) => ({
  id,
  type: getRandomEnumValue(["habitInvite", "nudge", "friendRequest"]),
  senderId: userIds[0],
  receiverId: userIds[1],
  sentAt: new Date(),
});

// Seed data
export const seedData = async () => {
  try {
    const userIds = ["user1", "user2", "user3"].map((id) => id as string);
    const habitIds = ["habit1", "habit2"].map((id) => id as string);
    const notificationIds = ["notif1", "notif2"].map((id) => id as string);

    // Seed users
    await Promise.all(
      userIds.map((id) => {
        const user = createMockUser(id);
        return db.collection("users").doc(id).set(user);
      }),
    );

    // Seed habits
    await Promise.all(
      habitIds.map((id) => {
        const habit = createMockHabit(id, userIds);
        return db.collection("habits").doc(id).set(habit);
      }),
    );

    // Seed notifications
    await Promise.all(
      notificationIds.map((id) => {
        const notification = createMockNotification(id, userIds);
        return db.collection("notifications").doc(id).set(notification);
      }),
    );

    console.log("Firestore seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
};

// Execute the seeding function
seedData();
