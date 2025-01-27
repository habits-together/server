import { onDocumentWritten } from "firebase-functions/v2/firestore";

// Trigger to maintain lowercase fields
export const onUserWritten = onDocumentWritten(
  "users/{userId}",
  async (event) => {
    if (!event.data) return;
    const afterData = event.data.after?.data();
    if (!afterData) return;

    const { displayName, username } = afterData;
    if (!displayName || !username) return;

    // Only update if the lowercase fields don't match
    if (
      afterData.displayNameLower !== displayName.toLowerCase() ||
      afterData.usernameLower !== username.toLowerCase()
    ) {
      await event.data.after.ref.set(
        {
          displayNameLower: displayName.toLowerCase(),
          usernameLower: username.toLowerCase(),
        },
        { merge: true }
      );
    }
  }
);
