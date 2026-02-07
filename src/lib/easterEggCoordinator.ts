let activeEasterEgg: string | null = null;

export function acquireEasterEggSlot(id: string): boolean {
    if (activeEasterEgg === null || activeEasterEgg === id) {
        activeEasterEgg = id;
        return true;
    }
    return false;
}

export function releaseEasterEggSlot(id: string): void {
    if (activeEasterEgg === id) {
        activeEasterEgg = null;
    }
}

export function getActiveEasterEgg(): string | null {
    return activeEasterEgg;
}
