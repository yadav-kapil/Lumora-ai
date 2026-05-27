const SERVER_URI = import.meta.env.VITE_SERVER_URI || "";

if (!SERVER_URI) {
    console.error("SERVER_URI ERROR !!!!")
}

export const { SERVER_URI };