export const prepareSourceName = (name) => {
    const words = name.split(' ');
    let result = ''
    let i = 0;
    while(i < words.length && result.length < 2) {
        if(words[i][0].match(/[a-z]/i)) {
            result+=(words[i][0].toUpperCase())
        }
        i++;
    }
    return result
}
