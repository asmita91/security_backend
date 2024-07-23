const sanitizeInput = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
};
export default sanitizeInput;
