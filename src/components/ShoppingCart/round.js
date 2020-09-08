// This function rounds number to 2 decimal places, prevents displaying weird numbers like for ex. 52.00000001
const round = function(item) {
    item = Math.round((item + Number.EPSILON) * 100) / 100;
    return item;
}
export default round;