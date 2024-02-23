const loginWithToken = async (token: string) => {
    await fetch("/api/login", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default loginWithToken;