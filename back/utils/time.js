function time(time) {
    if (parseFloat(time) < 10) {
        return "0" + time
    } else {
        return time
    }
}
module.exports=time