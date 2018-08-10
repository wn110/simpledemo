Ext.Application({
    name:'demo',
    appFolder:'ExtApp/DemoApp',
    //指定根目录
    controller:['Demo.controller.FirstPanel'],
    launch:function () {
        Ext.create('Demo.view.FirstPanel');
    }
});