import self from "../index";
import axios from "axios";

export default class DrawingController {
    constructor() {

    }

    saveToDisk(){
    	let img = self.app.modules.canvas.export();
    	let data = self.app.modules.drawing.export();

    	let options = {
    	    image: img,
    	    data: data
    	};

    	// Send to server
    	axios.post('//localhost:8080/save', options)
    	    .then(function(response) {
    	        console.log(response);
    	    })
    	    .catch(function(error) {
    	        console.log(error);
    	    });
    }

}
