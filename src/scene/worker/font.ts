import { Control } from "@babylonjs/gui";

//Babylon js lazily queries font metrics, but uses document.createElement() to
//do so. Obviously, this is not possible in web workers, so we register it
//eagerly beforehand inside web workers.
//
//IMPORTANT: This is not part of the official Babylon js API and is thus very
//           likely to break in future versions!

// @ts-ignore
Control._FontHeightSizes = {
    "  16px Arial": {
        "ascent": 14,
        "height": 18,
        "descent": 4
    },
    " 800 18px Arial": {
        "ascent": 20,
        "height": 26,
        "descent": 6
    },
    "16px Arial": {
        "ascent": 14,
        "height": 17.5,
        "descent": 3.5
    },
    "800 18px Arial": {
        "ascent": 20,
        "height": 26,
        "descent": 6
    },
    "18px Arial": {
        "ascent": 16,
        "height": 20.5,
        "descent": 4.5
    }
}
