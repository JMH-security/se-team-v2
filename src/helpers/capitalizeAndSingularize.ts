export const capitalizeAndSingularize = (word: string) => {
    // Step 1: Capitalize the first letter of the word
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    // Step 2: Convert to singular
    let singular = capitalized;

    // Handle specific plural forms
    if (singular.endsWith('ies')) {
        singular = singular.slice(0, -3) + 'y';  // e.g., "companies" -> "company"
    } else if (singular.endsWith('es')) {
        singular = singular.slice(0, -2);  // e.g., "branches" -> "branch"
    } else if (singular.endsWith('s')) {
        singular = singular.slice(0, -1);  // e.g., "supervisors" -> "supervisor"
    }

    return singular;
}