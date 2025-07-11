export async function getItem(key: string): Promise<string | null> {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error getting item from storage: ${error}`);
        return null;
    }
}

export async function setItem(key: string, value: any): Promise<void> {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item in storage: ${error}`);
    }
}