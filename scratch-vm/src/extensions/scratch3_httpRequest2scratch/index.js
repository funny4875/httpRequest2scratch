const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

var xhr = new XMLHttpRequest();
var httpResponseText = '';
xhr.onload = function () {
			httpResponseText= xhr.responseText;
	};

class httpRequest2scratch {
	get POST_GET_MENU () {
      return [
          {
            text: 'GET',
            value: 'GET'
          },
          {
            text: 'POST',
            value: 'POST'
          }
      ]
    }
    constructor (runtime) {
        this.runtime = runtime;
    }
    getInfo () {
        return {
            id: 'httpRequest2scratch',
            name: 'HttpRequest2scratch',
            blocks: [
				{
                    opcode: 'getHttpResponse',
                    blockType: BlockType.REPORTER,
                    text: 'getHttpResponse'
                },
				{
                    opcode: 'openXHR',
                    blockType: BlockType.COMMAND,
                    text: '1.新增 HttpRequest 物件 [TYPE][URL]',
                    arguments: {
						TYPE: {
                            type: ArgumentType.STRING,
							menu: 'Post_Get',
                            defaultValue: "POST"
                        },
                        URL: {
                            type: ArgumentType.STRING,
							defaultValue: "http://tinywebdb.appinventor.mit.edu/getvalue"
                            
                        }
                    }
                },
				{
                    opcode: 'setHeader',
                    blockType: BlockType.COMMAND,
                    text: '(2).設定 HttpRequest Header [TAG][DATA]',
                    arguments: {
                        TAG: {
                            type: ArgumentType.STRING,
                            defaultValue: "TAG"
                        },
						DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: "DATA"
                        }
                    }
                },
				{
                    opcode: 'sendXHR',
                    blockType: BlockType.COMMAND,
                    text: '3.送出HttpRequest [DATA]',
                    arguments: {
						DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: "tag=HP"
                        }
                    }
                }
            ],
            menus: {
				Post_Get: {
                acceptReporters: true,
                items: this.POST_GET_MENU
              }
            }
        };
    };
	
	getHttpResponse(){
		return httpResponseText;
	}
	openXHR(args)
	{
		const TYPE = Cast.toString(args.TYPE);
		const URL = Cast.toString(args.URL);
		log.log("open xhr:"+TYPE+","+URL);
		xhr.open(TYPE,URL ,true);
	}
	setHeader(args)
	{
		const TAG = Cast.toString(args.TAG);
		const DATA = Cast.toString(args.DATA);
		try{
			xhr.setRequestHeader(TAG,DATA);
		}catch(error){log.log(error);}
	}
	sendXHR(args)
	{
		const DATA = Cast.toString(args.DATA);
		log.log("send xhr , data:"+DATA);
		xhr.send(DATA);
	}
}

module.exports = httpRequest2scratch;
