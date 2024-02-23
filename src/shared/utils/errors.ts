type FirebaseError = {
    code: string;
    message: string;
};

type FirebaseErrorMappings = {
    [key: string]: string;
};

const firebaseErrors: FirebaseErrorMappings = {
    'auth/email-already-in-use': 'This email is already in use.',
    'auth/invalid-credential': 'The credential is malformed or has expired.',
    'auth/network-request-failed': 'A network error has occurred.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
    'auth/weak-password': 'The password is too weak.',
    'auth/wrong-password': 'The password is incorrect.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/internal-error': 'An error occured',
    'auth/cancelled-popup-request': 'Popup has been closed',
    'auth/popup-closed-by-user': 'The popup has been closed before authentication could complete.',
};

export const normalizeFirebaseError = (error: FirebaseError) => {
    if (error.code in firebaseErrors) {
        return firebaseErrors[error.code];
    } else {
        return error.message;
    }
};