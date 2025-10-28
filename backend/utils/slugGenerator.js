// backend/src/utils/slugGenerator.js
const generateSlug = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
};
export default generateSlug;