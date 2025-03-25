import { db } from "../utils/firebase"

// Mock data from the app
const mockUsers = [
  {
    id: "1",
    displayName: "John Doe",
    username: "john_doe",
    createdAt: new Date(),
  },
  {
    id: "2",
    displayName: "Jane Doe",
    username: "jane_doe",
    createdAt: new Date(),
  },
  {
    id: "3",
    displayName: "Apple Smith",
    username: "apple",
    createdAt: new Date(),
  },
  {
    id: "4",
    displayName: "Bob Johnson",
    username: "bob_johnson",
    createdAt: new Date(),
  },
  {
    id: "5",
    displayName: "Lorem Ipsum",
    username: "lorem_ipsum",
    createdAt: new Date(),
  },
  {
    id: "6",
    displayName: "Sarah Wilson",
    username: "sarah_wilson",
    createdAt: new Date(),
  },
];

const mockHabits = [
  {
    id: "1",
    colorName: "orange",
    createdAt: new Date("2024-01-01T00:00:00"),
    description: "Drink 8 glasses of water daily",
    title: "Drink a Glass of Water",
    settings: {
      allowMultipleCompletions: true,
    },
    icon: "glassWater",
    participants: {
      "1": {
        displayName: "John Doe",
        username: "john_doe",
        lastActivity: new Date("2024-12-01T00:00:00"),
        isOwner: true,
      },
      "2": {
        displayName: "Jane Doe",
        username: "jane_doe",
        lastActivity: new Date("2025-01-11T00:00:00"),
        isOwner: false,
      },
      "3": {
        displayName: "Apple Smith",
        username: "apple",
        lastActivity: new Date("2024-12-08T00:00:00"),
        isOwner: false,
      },
      "4": {
        displayName: "Bob Johnson",
        username: "bob_johnson",
        lastActivity: new Date("2024-12-07T00:00:00"),
        isOwner: false,
      },
      "5": {
        displayName: "Lorem Ipsum",
        username: "lorem_ipsum",
        lastActivity: new Date("2024-12-03T00:00:00"),
        isOwner: false,
      },
    },
  },
  {
    id: "2",
    colorName: "green",
    createdAt: new Date("2024-01-02T00:00:00"),
    description: "Go for a 30-minute run",
    title: "Exercise",
    settings: {
      allowMultipleCompletions: false,
    },
    icon: "dumbbell",
    participants: {
      "1": {
        displayName: "John Doe",
        username: "john_doe",
        lastActivity: new Date("2024-01-15T00:00:00"),
        isOwner: true,
      },
    },
  },
  {
    id: "3",
    colorName: "purple",
    createdAt: new Date("2024-01-03T00:00:00"),
    description: "Read for 20 minutes before bed",
    title: "Reading",
    settings: {
      allowMultipleCompletions: false,
    },
    icon: "book",
    participants: {
      "1": {
        displayName: "John Doe",
        username: "john_doe",
        lastActivity: new Date("2024-12-01T00:00:00"),
      },
      "6": {
        displayName: "Sarah Wilson",
        username: "sarah_wilson",
        lastActivity: new Date("2024-12-15T00:00:00"),
        isOwner: true,
      },
    },
  },
  {
    id: "4",
    colorName: "blue",
    createdAt: new Date("2024-01-04T00:00:00"),
    description: "Meditate for 10 minutes",
    title: "Daily Meditation",
    settings: {
      allowMultipleCompletions: false,
    },
    icon: "star",
    participants: {
      "2": {
        displayName: "Jane Doe",
        username: "jane_doe",
        lastActivity: new Date("2024-12-15T00:00:00"),
        isOwner: true,
      },
      "4": {
        displayName: "Bob Johnson",
        username: "bob_johnson",
        lastActivity: new Date("2024-12-14T00:00:00"),
        isOwner: false,
      },
    },
  },
];

const mockHabitCompletions = {
  "1": {
    "1": {
      entries: {
        "2024-12-04": { numberOfCompletions: 0 },
        "2024-12-05": { numberOfCompletions: 1 },
        "2024-12-06": { numberOfCompletions: 1 },
        "2024-12-18": {
          numberOfCompletions: 1,
          note: "Drank 8 glasses of water today!",
        },
      },
    },
    "2": {
      entries: {
        "2024-12-04": { numberOfCompletions: 2 },
        "2024-12-05": { numberOfCompletions: 3 },
        "2024-12-06": { numberOfCompletions: 1 },
        "2025-01-11": { numberOfCompletions: 1, note: "Drank 8 glasses" },
      },
    },
    "3": {
      entries: {
        "2024-12-04": { numberOfCompletions: 1 },
        "2024-12-05": { numberOfCompletions: 2 },
        "2024-12-06": { numberOfCompletions: 2 },
      },
    },
    "4": {
      entries: {
        "2024-12-04": { numberOfCompletions: 3 },
        "2024-12-05": { numberOfCompletions: 1 },
        "2024-12-06": { numberOfCompletions: 0 },
      },
    },
    "5": {
      entries: {
        "2024-12-04": { numberOfCompletions: 3 },
        "2024-12-05": { numberOfCompletions: 1 },
        "2024-12-06": { numberOfCompletions: 0 },
      },
    },
  },
  "2": {
    "1": {
      entries: {
        "2024-12-04": { numberOfCompletions: 1 },
        "2024-12-05": { numberOfCompletions: 0 },
        "2024-12-06": { numberOfCompletions: 1 },
      },
    },
  },
  "3": {
    "1": {
      entries: {
        "2024-12-04": { numberOfCompletions: 0 },
        "2024-12-05": { numberOfCompletions: 0 },
        "2024-12-06": { numberOfCompletions: 1 },
      },
    },
    "6": {
      entries: {
        "2024-12-13": { numberOfCompletions: 1 },
        "2024-12-14": { numberOfCompletions: 1 },
        "2024-12-15": { numberOfCompletions: 1, note: "Great book tonight!" },
      },
    },
  },
  "4": {
    "2": {
      entries: {
        "2024-12-13": { numberOfCompletions: 1 },
        "2024-12-14": { numberOfCompletions: 1 },
        "2024-12-15": { numberOfCompletions: 1, note: "Very peaceful session" },
      },
    },
    "4": {
      entries: {
        "2024-12-12": { numberOfCompletions: 1 },
        "2024-12-13": { numberOfCompletions: 1 },
        "2024-12-14": { numberOfCompletions: 1, note: "Feeling zen" },
      },
    },
  },
};

const mockRelationships = {
  "1": {
    "2": { status: "friends", friendsSince: new Date() },
    "4": { status: "friends", friendsSince: new Date() },
  },
  "2": {
    "1": { status: "friends", friendsSince: new Date() },
    "4": { status: "friends", friendsSince: new Date() },
  },
  "4": {
    "1": { status: "friends", friendsSince: new Date() },
    "2": { status: "friends", friendsSince: new Date() },
  },
};

const mockNotifications = [
  {
    type: "friendRequest",
    senderId: "3",
    receiverId: "1",
    sentAt: new Date(new Date().getTime() - 20 * 1000), // 20 seconds ago
  },
  {
    type: "friendRequest",
    senderId: "6",
    receiverId: "1",
    sentAt: new Date(new Date().getTime() - 3600 * 1000), // 1 hour ago
  },
  {
    type: "habitInvite",
    habitId: "4",
    senderId: "2",
    receiverId: "1",
    sentAt: new Date(new Date().getTime() - 1800 * 1000), // 30 minutes ago
  },
  {
    type: "nudge",
    habitId: "1",
    senderId: "4",
    receiverId: "1",
    sentAt: new Date(new Date().getTime() - 172800 * 1000), // 2 days ago
  },
];

const mockPictures = {
  "1": "https://randomuser.me/api/portraits/men/1.jpg",
  "2": "https://randomuser.me/api/portraits/women/3.jpg",
  "3": "https://randomuser.me/api/portraits/women/4.jpg",
  "4": "https://randomuser.me/api/portraits/men/5.jpg",
  "5": "https://randomuser.me/api/portraits/men/6.jpg",
  "6": "https://randomuser.me/api/portraits/women/7.jpg",
};

// Seed data
export const seedData = async () => {
  try {
    // Clear existing data
    const collections = [
      "users",
      "habits",
      "habitCompletions",
      "relationships",
      "notifications",
      "pictures",
    ];
    await Promise.all(
      collections.map(async (collection) => {
        const snapshot = await db.collection(collection).get();
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      })
    );

    // Seed users
    await Promise.all(
      mockUsers.map((user) => db.collection("users").doc(user.id).set(user))
    );

    // Seed habits
    await Promise.all(
      mockHabits.map((habit) =>
        db.collection("habits").doc(habit.id).set(habit)
      )
    );

    // Seed habit completions
    for (const [habitId, userCompletions] of Object.entries(
      mockHabitCompletions
    )) {
      await Promise.all(
        Object.entries(userCompletions).map(([userId, completions]) =>
          db
            .collection("habitCompletions")
            .doc(`${habitId}_${userId}`)
            .set({ habitId, userId, ...completions })
        )
      );
    }

    // Seed relationships
    for (const [userId1, userRelationships] of Object.entries(
      mockRelationships
    )) {
      await Promise.all(
        Object.entries(userRelationships).map(([userId2, relationship]) =>
          db
            .collection("relationships")
            .doc(`${userId1}_${userId2}`)
            .set({ userId1, userId2, ...relationship })
        )
      );
    }

    // Seed notifications
    await Promise.all(
      mockNotifications.map((notification, index) =>
        db
          .collection("notifications")
          .doc(`${index + 1}`)
          .set(notification)
      )
    );

    // Seed pictures
    await Promise.all(
      Object.entries(mockPictures).map(([userId, url]) =>
        db.collection("pictures").doc(userId).set({ url })
      )
    );

    console.log("Firestore seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
};

// Execute the seeding function
seedData();
