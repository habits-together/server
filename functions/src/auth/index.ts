import {
    onCall,
    HttpsError,
    CallableRequest,
} from "firebase-functions/v2/https";
import { auth } from "../utils/firebase";

export const checkUserExistsInAuth = onCall(
    async (request: CallableRequest<{ email: string }>) => {
        const { email } = request.data;

        if (!email) {
            throw new HttpsError(
                "invalid-argument",
                "You must provide an email."
            );
        }

        try {
            await auth.getUserByEmail(email);
            return {
                exists: true,
            };
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
                return { exists: false };
            }
            throw new HttpsError(
                "unknown",
                "Failed to check user existence",
                error
            );
        }
    }
);
