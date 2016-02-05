/**
 * Created by gbox3d on 2014. 2. 26..
 */



var theApp = {

    version : '0.0.1',
    event : {
        downEvent : "touchstart",
        upEvent : "touchend"
    },
    setup : function() {

        var scope = this;

        (function() {

            async.waterfall(
                [
                    function(next) {

                        //amd 셋업
                        scope.amd.setupAMD(
                            {
                                modules : [
                                    {
                                        name : 'testDlg',
                                        type: 'popup'
                                    },
                                    {
                                        name : 'testPage',
                                        type : 'panel'
                                    },
                                    {
                                        name : 'testPage2',
                                        type : 'panel'
                                    }
                                ],
                                callback : function() {
                                    console.log('AMD complete');
                                    next(null);
                                }
                            }
                        );
                    }
                ],
                function(error,results) {

                    if(!error) { //에러 없이 모두 과정 마침..
                        console.log('success start app');
                        scope.amd.panel['testPage'].show();

                    }
                    else {
                        console.log(error);
                        alert(JSON.stringify(error));

                    }

                }
            );

        }).bind(theApp)()

    }
};

