({
    handleChange: function (cmp, event) {
        var changeValue = event.getParam("value");
        console.log('changeValue=' + changeValue);
        cmp.set("v.value", changeValue);
        console.log('value=' + cmp.get("v.value"));
    }
})