$(document).ready(function(){
  $(function() {
  var roomNames = ["livingRoom", "kitchen", "diningRoom", "bedroom"];
  $( "#datepicker").datepicker();
  // there's the gallery and the dropTarget
  var $gallery = $( "#gallery" ),
    $dropTarget = $( ".siot-drop-target" );

  var controlsDialog = $( "#controlsForm" ).dialog({
    autoOpen: false,
    height: 350,
    width: 350,
    modal: true,
    buttons: {
    "Update Temperature": updateTemperature,
    Cancel: function() {
      controlsDialog.dialog( "close" );
      }
    }
  });
  
  // let the gallery items be draggable
  $( "li", $gallery ).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // let the dropTarget be droppable, accepting the gallery items
  $dropTarget.droppable({
    accept: ".ui-widget-content.ui-corner-tr",
    activeClass: "ui-state-highlight",
    drop: function( event, ui ) {
      console.log($(this).attr("id"));
      if ($(this).attr("id")==="livingRoom") {
      console.log("target is the livingRoom");
      console.log(ui);
      console.log("This device is a " + ui.draggable.data("info").model + " made by " + ui.draggable.data("info").name);
      deleteImage( ui.draggable.clone(), 0 );
      } else if ($(this).attr("id")==="kitchen") {
        console.log("target is the kitchen");
        deleteImage( ui.draggable.clone(), 1 );
      } else if ($(this).attr("id")==="diningRoom") {
        console.log("target is the diningRoom");
        deleteImage( ui.draggable.clone(), 2 );
      } else if ($(this).attr("id")==="bedroom") {
        console.log("target is the bedroom");
        deleteImage( ui.draggable.clone(), 3 );
      }
    }
  });

  // let the gallery be droppable as well, accepting items from the dropTarget
  $gallery.droppable({
    accept: ".siot-drop-target li",
    activeClass: "custom-state-active",
    drop: function( event, ui ) {
      recycleImage( ui.draggable );
    }
  });

  // image deletion function
  var delete_icon = "<a href='#' title='Recycle this image' style='float:right'><i class='glyphicon glyphicon-trash' aria-hidden='true'></i></a>",
  edit_icon = "<a href='#' title='Edit this device' style='float:left'><i class='glyphicon glyphicon-pencil' aria-hidden='true'></i></a>",
  controls_icon = "<a href='#' title='Control this device' style='float:right'><i class='glyphicon glyphicon-tasks' aria-hidden='true'></i></a>",
  chart_icon = "<a href='#' title='History of device' style='float:left'><i class='glyphicon glyphicon-stats' aria-hidden='true'></i></a>";
  
  function deleteListItem() {
    console.log("Trash was clicked");
    //console.log("This is a " + $item.html());
    return true;
  }
  
  function deleteImage( $item, room ) {
    var roomIndex = room;
    $item.fadeOut(function() {
      var $list = $( "ul", $dropTarget[roomIndex] ).length ?
        $( "ul", $dropTarget[roomIndex] ) :
        $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $dropTarget[roomIndex] );

      $item.find( "a.ui-icon-dropTarget" ).remove();
      $item.prepend( edit_icon, controls_icon ).append( delete_icon, chart_icon ).appendTo( $list ).fadeIn(function() {
        $item
          .animate({ width: "48px" })
          .find( "img" )
            .animate({ height: "36px" });
      });
    });
  }

  // image recycle function
  var dropTarget_icon = "<a href='link/to/dropTarget/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-dropTarget'>Delete image</a>";
  function recycleImage( $item ) {
    $item.fadeOut(function() {
      $item
        .find( "a.ui-icon-refresh" )
          .remove()
        .end()
        .css( "width", "96px")
        .append( dropTarget_icon )
        .find( "img" )
          .css( "height", "72px" )
        .end()
        .appendTo( $gallery )
        .fadeIn();
    });
  }

  // image preview function, demonstrating the ui.dialog used as a modal window
  function viewLargerImage( $link ) {
    var src = $link.attr( "href" ),
      title = $link.siblings( "img" ).attr( "alt" ),
      $modal = $( "img[src$='" + src + "']" );

    if ( $modal.length ) {
      $modal.dialog( "open" );
    } else {
      var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
        .attr( "src", src ).appendTo( "body" );
      setTimeout(function() {
        img.dialog({
          title: title,
          width: 400,
          modal: true
        });
      }, 1 );
    }
  }

  //Function to control the slider in the thermometer panel
  
  $(function() {
    $( "#slider-range-min" ).slider({
      range: "min",
      value: 67,
      min: 1,
      max: 105,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value + " F");
      }
    });
    $( "#amount" ).val( $( "#slider-range-min").slider( "value" ) + " F");
  });
  
  function updateTemperature() {
  controlsDialog.dialog("close");
  }
  
  // this is me trying my hand at jquery functions
  function datePicker(num) {
    console.log("ok, running the datepicker function");
    console.log("the number passed was " + num);
    $( "#datepicker" ).datepicker("show");
  }

  function openControls() {
    controlsDialog.dialog("open");
  }

  // resolve the icons behavior with event delegation
  $( ".ui-widget-content.ui-state-default.siot-drop-target.ui-droppable" ).on("click", "li", function( event ) {
    var $item = $( this ),
      $target = $( event.target );
    
    if ( $target.is("a > i.glyphicon-trash") ) {
      console.log("glyphicon-trash was clicked");
      $item.fadeOut();
    } else if ( $target.is( "a > i.glyphicon-tasks" ) ) {
      console.log("controlsDialog is being called.");
      openControls();
    } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
      viewLargerImage( $target );
    } else if ( $target.is( "a.ui-icon-refresh" ) ) {
      recycleImage( $item );
    };

    return false;
  });
});
});
