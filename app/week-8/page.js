'use client'

// Import the useUserAuth hook
import { updateProfile } from 'firebase/auth';
import { useUserAuth } from "./_utils/auth-context";
import { auth } from "./_utils/firebase"; 
import Link from 'next/link';

export default function Page(){
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleSignIn = async () => {
        try {
          await gitHubSignIn();
          if (auth.currentUser && !auth.currentUser.displayName) {
            await updateProfile(auth.currentUser, {
              displayName: 'KeithC' // You can replace this with a prompt/input for user to set their name
            });
            // Optionally reload the user to reflect the changes
            await auth.currentUser.reload();
          }
        } catch (error) {
          console.error("Error signing in: ", error);
        }
      };
    return (
        <div className="bg-black text-white min-h-screen p-5">
            <h1 className="text-4xl font-bold mb-5">Shopping List</h1>
            {user ? (
                <>
                    <p className="mb-4">Signed in as {user.displayName || 'No name available'} ({user.email})</p>
                    <button 
                        onClick={firebaseSignOut} 
                        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                        Sign out
                    </button>
                    <p><Link className="mb-4 hover:underline" href="./week-8/shopping-list" >Continue to your Shopping List</Link></p>
                </>
            ) : (
                <>
                    <p className="mb-4">Please sign in</p>
                    <button 
                        onClick={handleSignIn} 
                        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                        Sign in with GitHub
                    </button>
                </>
            )}
        </div>
    );
}
 
// Use the useUserAuth hook to get the user object and the login and logout functions
// const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
 
// // Sign in to Firebase with GitHub authentication
// await gitHubSignIn();
 
// // Sign out of Firebase
// await firebaseSignOut();
 
// // Display some of the user's information
// <p>
//   Welcome, {user.displayName} ({user.email})
// </p>;