$( document ).ready( function() {

	//

	$('#selectBox').change(function() {

		var state = jQuery('#selectBox option:selected').val();

		if ( state == 'option2' ) {
			jQuery('.layer').show();
		} else {
			jQuery('.layer').hide();
		}

	});


	//

	$('.pop_close').on('click',function() {                                                      
		jQuery('.layer').hide();
	}); 


	//

	inputFileEvent(
		".wrap_fileSearch .btn1-s-slight"
		, ".wrap_fileSearch input[type='file']"
		, ".wrap_fileSearch .delete"
	) ;

	/** 메뉴 */
	$( ".d1" ).click( function() {
		var slideTime = 150 ;

		if ( $( this ).next().css( "display" ) == "none" ) {
			$( ".d1" ).removeClass( "open" ) ;
			$( ".depth02" ).slideUp( slideTime ) ;
			$( this ).addClass( "open" ) ;
			$( this ).next().slideDown( slideTime ) ;
		} else {
			$( ".d1" ).removeClass( "open" ) ;
			$( ".depth02" ).slideUp( slideTime ) ;
		}

		return false;
	}) ;

}) ;

/* input[type="file"] 이벤트 */
function inputFileEvent ( btnFile, inputFile, btnDelete ) {
	// 파일첨부 링크 클릭 시
	$( btnFile ).bind( "click", function() {
		var fileId = $( this ).attr( "href" ) ;
		$( fileId ).click() ;

		return false;
	}) ;

	// 파일 첨부 완료, 변경 시
	$( inputFile ).change( function( e ) {
		var fileObj  = $( this ).val()
			, Prt = $( this ).parent()
			, pathHeader
			, pathMiddle
			, pathEnd
			, allFilename
			, fileName
			, extName ;

		if ( fileObj != "" ) {
			pathHeader = fileObj.lastIndexOf( "\\" ) ;
			pathMiddle = fileObj.lastIndexOf( "." ) ;
			pathEnd = fileObj.length;
			fileName = fileObj.substring( pathHeader + 1, pathMiddle ) ;
			extName = fileObj.substring( pathMiddle + 1, pathEnd ) ;
			allFilename = fileName + "." + extName ;

			$( this ).parent().children( ".fileName" ).html( allFilename ) ;
			$(Prt).children( ".btn1-s-slight" ).hide() ;
			$(Prt).children( ".delete" ).detach() ;
			$(Prt).children( ".fileName" ).after( '<a href="#" class="ico_ del delete">첨부된 ' + allFilename + ' 파일 삭제</a>' ) ;
			$(Prt).children( ".delete" ).fadeIn() ;
		}
	}) ;

	// 파일 삭제 시
	$( document ).delegate( btnDelete, "click", DeleteFileEvt ) ;

	function DeleteFileEvt() {
		var _this = $( this ) ;
		$( _this ).parent().children( "input[type='file']" ).val( null ) ;
		$( _this ).parent().children( ".btn1-s-slight" ).show() ;
		$( _this ).parent().children( ".fileName" ).html( "" ) ;
		$( _this ).detach() ;

		return false ;
	}
}