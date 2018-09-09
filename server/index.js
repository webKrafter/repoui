process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const { env: { PWD: pwd }} = process;

let mediaAssets = null;

const { readdirSync, readFileSync } = require( 'fs' ),
      { host } = require( `../src/properties/${ process.env.NODE_ENV || 'production' }` ),
      nonMediaFilePattern = new RegExp( /.+\.((js(on|x)?)|(c|le|sa|sc)ss)$/ ),
      getMediaAssets = () => {
        if( mediaAssets === null ){
            mediaAssets = readdirSync( `${ process.env.PWD }/build/static/media` ); 
        }
        return mediaAssets;
      },
      findStaticMediaUri = ( assetPath, mediaDirPath = `${ host }/dist/static/media` ) => {
        const file = assetPath.substring( assetPath.lastIndexOf( '/' ) + 1 ),
            splitIndex = file.lastIndexOf( '.' ),
            filename = file.substring( 0, splitIndex ),
            extension = file.substring( splitIndex + 1 );
            mediaFile = getMediaAssets().find( file => {
                        const _filename = file.substring( file.lastIndexOf( '/' ) + 1 );
                        return _filename.startsWith( filename ) && _filename.endsWith( extension );
                    });
        return mediaFile ? `${ mediaDirPath }/${ mediaFile.substring( mediaFile.lastIndexOf( '/' ) + 1 )}` : null;
      }

require( 'babel-register' )({
    ...JSON.parse( readFileSync( './.babelrc' )),
    ignore: [ /node_modules/ ],
    plugins: [
        'import-require', [
            'transform-assets', {
                extensions: [ 'css', 'sass', 'scss', 'less' ]
        }],
        function transformMediaAssets({ types: t }){
            return {
                visitor: {
                    CallExpression( path ){
                        const { callee: { name }, arguments: args } = path.node;
                        if( name !== 'require' || !args.length || 
                            !t.isStringLiteral( args[ 0 ]) ||
                            nonMediaFilePattern.test( args[ 0 ].value )){
                            return;
                        }
                        const mediaUri = findStaticMediaUri( args[ 0 ].value );
                        mediaUri && path.replaceWith( t.StringLiteral( mediaUri ));
                    }       
                }
            };
        }
    ]
});

require( './server' );
