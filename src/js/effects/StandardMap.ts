
export default class StandardMap {

    static useBlue: boolean = true;
    static lut: Phaser.Sprite;
    static filter: Phaser.Filter;

    static AddMapEffects(game: Phaser.Game) : Phaser.Group {

        let s1 = game.add.tileSprite(0, 0, game.width, game.height, 'scanlines');
        s1.alpha = .50;
        s1.blendMode = PIXI.blendModes.MULTIPLY;
        let s3 = game.add.sprite(0,0, 'grid');
        let s4 = game.add.sprite(0,0, 'border-blend');
        s4.blendMode = PIXI.blendModes.MULTIPLY;
        s4.alpha = .75;
        let s45 = game.add.sprite(0,0, 'vignette');
        s45.alpha = .75;
        s45.blendMode = PIXI.blendModes.MULTIPLY;
        let s5 = game.add.sprite(0,0, 'screen-glare');
        s5.blendMode = PIXI.blendModes.SOFT_LIGHT;
        s5.alpha = .75;

        let grouped = new Phaser.Group(game);
        grouped.add(s1);
        grouped.add(s3);
        grouped.add(s4);
        grouped.add(s45);
        grouped.add(s5);

        // StandardMap.setupShader(game);

        return grouped;
    }

    static disallowBlue() {
        this.useBlue = false;
    }

    static setupShader(game: Phaser.Game) {

        if (this.useBlue) {

            // define the fragment shader
            var fragmentSrc = [
                "precision mediump float;",

                "varying vec2 vTextureCoord;",
                "varying vec4 vColor;",
                "uniform sampler2D uSampler;",

                "uniform sampler2D iChannel0;",


                "void main(void) {",
                "vec4 sample = texture2D(uSampler, vTextureCoord);",
                "vec4 lookup = texture2D(iChannel0, vTextureCoord);",

                "vec4 textureColor = clamp(sample, 0.0, 1.0);",

                "mediump float blueColor = textureColor.b * 63.0;",

                "// get lower color",
                "mediump vec2 quad1;",
                "quad1.y = floor(floor(blueColor) / 8.0);",
                "quad1.x = floor(blueColor) - (quad1.y * 8.0);",

                "// get upper color",
                "mediump vec2 quad2;",
                "quad2.y = floor(ceil(blueColor) / 8.0);",
                "quad2.x = ceil(blueColor) - (quad2.y * 8.0);",

                "highp vec2 texPos1;",
                "texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);",
                "texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);",

                "//texPos1.y = 1.0-texPos1.y;",

                "highp vec2 texPos2;",
                "texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);",
                "texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);",

                "//texPos2.y = 1.0-texPos2.y;",

                "lowp vec4 newColor1 = texture2D(iChannel0, texPos1);",
                "lowp vec4 newColor2 = texture2D(iChannel0, texPos2);",

                "lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));",
                "newColor.a = textureColor.a;",

                "gl_FragColor = newColor;",
                "}"
            ];

            // load the image
            this.lut = game.add.sprite(0, 0, 'lut');
            this.lut.exists = false;

            // structure uniforms
            var customUniforms = {
                iChannel0: { type: 'sampler2D', value: this.lut.texture, textureData: { repeat: true } }
            };

            // apply filter
            this.filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
            this.filter.setResolution(640, 960);

            // add the filter to the game world object
            //logo.filters = [filter];
            game.world.filters = [this.filter];
        }
    }
}
