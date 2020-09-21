$(function() {
    $('a.menulist').click(function(e) {
    e.preventDefault();
    
    $('a.menulist').removeClass('currentlink');
    $('a.menulist').addClass('nav-link');
   
    $(this).addClass('currentlink');
    $(this).removeClass('nav-link');
  });
});


function openSidemenu() {
  $('.sidebar').removeAttr('onmouseover').removeAttr('onmouseout');
  document.getElementById("main-panel").style.width= "calc(100% - 260px)";
    document.getElementById("sidebar").style.width = "260px";
    document.getElementById("sidebar").style.boxShadow = " 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)";
    document.getElementById("sidebar-text").style.width = "260px";
    document.getElementById("main-panel").style.marginLeft = "260px";

}

  var mini = true;

function toggleSidebar() {
  if (mini) {
    console.log("opening sidebar");
    document.getElementById("main-panel").style.width= "calc(100% - 260px)";
    document.getElementById("datatable_sec").style.width= "calc(100% - 260px)";
    document.getElementById("sidebar").style.width = "260px";
    document.getElementById("sidebar").style.boxShadow = " 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)";
    document.getElementById("sidebar-text").style.width = "260px";
    document.getElementById("main-panel").style.marginLeft = "260px";
    document.getElementById("datatable_sec").style.marginLeft = "260px";
    $(".caret").show();
    this.mini = false;

  } else {
    console.log("closing sidebar");
    document.getElementById("sidebar").style.width = "68px";
    document.getElementById("sidebar").style.boxShadow = "none";
    document.getElementById("sidebar-text").style.width = "68px";
    document.getElementById("main-panel").style.marginLeft = "68px";
    document.getElementById("datatable_sec").style.marginLeft = "68px";
    $(".caret").hide();
    document.getElementById("main-panel").style.width= "calc(100% - 68px)";
     document.getElementById("datatable_sec").style.width= "calc(100% - 68px)";
    this.mini = true;
  }
}

$(document).ready(function() {
  $('#waitingtoprint').DataTable(
    {
        dom: 'lBfrtip',
        buttons: [
          'selectAll',
          'selectNone',
          'print'
      ],
      language: {
          buttons: {
              selectAll: "Select all",
              selectNone: "Deselect all",
              print: "Print Selected"
          }
      }
       /* buttons: [
            
            {
                extend: 'print',
                text: 'Print Selected'
            }
        ]*/ ,
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   4
        } ],

        select: {
      'style': 'multi'
   },
        order: [[ 1, 'asc' ]]
    } );


    $('#unmatchedpurchaseorders').DataTable(
      {
        dom: 'lBfrtip',
        buttons: [
          'selectAll',
          'selectNone',
          'print'
      ],
      language: {
          buttons: {
              selectAll: "Select all",
              selectNone: "Deselect all",
              print: "Force Print/Email Selected"
          }
      }
       /* buttons: [
            
            {
                extend: 'print',
                text: 'Print Selected'
            }
        ]*/ ,
        
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        },
        {
          orderable: false,
          className: 'select-checkbox',
          targets:   5
      },
      {
        orderable: false,
        className: 'select-checkbox',
        targets:   6
    } ],

        select: {
      'style': 'multi'
   },
        order: [[ 1, 'asc' ]]
    } );

      
    $('#printeddocuments').DataTable(
      {
            dom: 'lBfrtip',

          buttons: [
            'selectAll',
            'selectNone',
            'print'
        ],
        language: {
            buttons: {
                selectAll: "Select all",
                selectNone: "Deselect all",
                print: "Reprint Selected"
            }
        }
         /* buttons: [
              
              {
                  extend: 'print',
                  text: 'Print Selected'
              }
          ] */,
          columnDefs: [ {
              orderable: false,
              className: 'select-checkbox',
              targets:   4
          },
          {
            orderable: false,
            className: 'select-checkbox',
            targets:   5
        } ],
  
          select: {
        'style': 'multi'
     },
          order: [[ 1, 'asc' ]]
      } );



      $('#emaileddocuments').DataTable(
        {
          dom: 'lBfrtip',

        buttons: [
          'selectAll',
          'selectNone',
          'print'
      ],
      language: {
          buttons: {
              selectAll: "Select all",
              selectNone: "Deselect all",
              print: "Send Selected"
          }
      }
       /* buttons: [
            
            {
                extend: 'print',
                text: 'Print Selected'
            }
        ] */,
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   4
        },
        {
          orderable: false,
          className: 'select-checkbox',
          targets:   5
      } ],

        select: {
      'style': 'multi'
   },
        order: [[ 1, 'asc' ]]
    } );


  
       /* $('#exception_docs').DataTable(
          {
              
        order: [[1, 'asc']],
        columnDefs:[
            { 
                targets: 5,
                searchable: false,
                orderable: false,
                render: function(data, type, full, meta){
                   if(type === 'display'){
                      data = '<input type="radio" name="id" value="' + data + '">';      
                   }
                    
                   return data;
                }
            }
        ]
              
          } );  */
    

} );

