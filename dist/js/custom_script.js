 $(window).on("load", function() {
    var url = window.location;

    // // for sidebar menu entirely but not cover treeview
    $('.menu-sec ul li a').filter(function() {
            $('.menu-sec ul li').removeClass('active');
            return this.href == url;
        }).closest("li").addClass('active');    

    $("a[href='#']").click(function(e) {
        e.preventDefault();
    })


    $(".visibility-icon").on('click', function() {
        var $this = $(this).closest(".form-group").find(".form-control");
        $(this).toggleClass("is-visible");
        if ($this.attr("type") == "password") {
            $this.attr("type", "text");
        } else {
            $this.attr("type", "password");
        }
    })

    if ($(".select2").length > 0 && $(".no-default-select2").length == 0) {
        $('.select2').select2({
            allowClear: true,
            width: '100%'
        });
        $('.select2').on('select2:select', function (e) {
           $(this).addClass("option-selected")
          });
          $('.select2').on('select2:unselect', function (e) {
           $(this).removeClass("option-selected")
          });
          $('.multi-select2').select2({
            width: '100%'
        });
    }

    $('#menubtns').click(function(e) {
        
        if($(".side-menu").hasClass("sidebar-toggle")){
            $(".side-menu").removeClass("sidebar-toggle");
            $("#maincomponents").removeClass("sidebar-toggle");
        }else{
            $(".side-menu").addClass("sidebar-toggle");
            $("#maincomponents").addClass("sidebar-toggle");
        }
        
    });
    $(".menu-close").click(function(e) {
         $(".side-menu").removeClass("sidebar-toggle");
        $("#maincomponents").removeClass("sidebar-toggle");
    });

    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('.wizard-inner a[data-toggle="tab"]').on('shown.bs.tab', function(e) {

        var target = $(e.target);

        if (target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function(e) {
        var active = $('.wizard-inner .nav-tabs li.active');
        active.next().removeClass('disabled');
        nextTab(active);

    });
    $(".prev-step").click(function(e) {

        var active = $('.wizard-inner .nav-tabs li.active');
        prevTab(active);

    });
    $('.wizard-inner .nav-tabs').on('click', 'li', function() {
        $('.wizard-inner .nav-tabs li.active').removeClass('active');
        $(this).nextAll().removeClass("completed");
        $(this).prevAll().addClass("completed");
        $(this).addClass('active');
        if ($(this).index() == 0) {
            $(".prev-step").attr('disabled', 'disabled');
        } else {
            $(".prev-step").removeAttr("disabled");
        }
        if ($(this).index() <= ($(this).closest("ul").find("li").length - 1)) {
            $(".next-step .nextstep-text").text('Next');
        }
        if ($(this).index() == ($(this).closest("ul").find("li").length - 1)) {
            $(".next-step .nextstep-text").text('Done');
        }
        if ($(this).hasClass('completed')) {
            $(this).removeClass('completed');
        }
    });

    // scrollable tabs
    $('.arrow-scrollable-tabs').scrollingTabs({
      cssClassLeftArrow: 'icon-angle-left',
      cssClassRightArrow: 'icon-angle-right'
    });

    // Editable Label
    $('.edit-text-icon').click(function() {
        var thisGroup = $(this).closest(".editable-label");
        var text = thisGroup.find('.text-info').text();
        var input = $('<input value="' + text + '" />')
        if(thisGroup.hasClass("has-datepicker")){
            $('.editable-date').datepicker({
                autoclose: true,
                endDate: "today",
             })  
        }else{
            thisGroup.find('.text-info').text('').append(input);
            input.select();
        }
        thisGroup.find('.edit-text-icon').hide();
        thisGroup.find('.save-text-icon').css("display","inline-block");
        thisGroup.addClass("is-editing");
    });
     $('.save-text-icon').click(function() {
        var thisGroup = $(this).closest(".editable-label");
         var text = thisGroup.find('input').val();
         if(thisGroup.hasClass("has-datepicker")){
            thisGroup.find('.editable-date').val();
            thisGroup.find('.text-info').text(text);
         }
         else{
            thisGroup.find('.text-info').text(text);
            thisGroup.find('input').remove();
         }
        thisGroup.find('.save-text-icon').hide();
        thisGroup.find('.edit-text-icon').css("display","inline-block");
        thisGroup.removeClass("is-editing");
    });

    

     // tooltips
     $('[data-toggle="tooltip"]').tooltip();

     $('.datepicker').datepicker({
        autoclose: true,
        // format: "MM/DD/YYYY",
        endDate: "today",
        todayHighlight: true
     });

    if ($("#attachmentDropzone").length) {
            // $("#dashboardDropzone").addClass('dropzone');
            var myDropzone = new Dropzone("#attachmentDropzone", {
                // maxFiles: 1,
                autoProcessQueue: false,
                acceptedFiles: ".pdf,.doc,.xls",
                chunking: true,
                forceChunking: true,
                chunkSize: 10000000,
                parallelChunkUploads: true,
                retryChunks: true,
                previewsContainer: '.attachmentPreview',
                addRemoveLinks:true,
                init: function() {
                    this.on("maxfilesreached",
                        function(file) {
                            $("#dashboardDropzone").css("pointer-events", "none");
                        });
                    this.on("error", function(file) {
                        var type = file.type;
                        if (!file.accepted) {
                            alert("Something went wrong while uploading file. Please upload right file type with accepted extension as .pdf,.doc,.docx");
                        }
                        this.removeFile(file);
                        $(".ajaxLoader").hide();
                    });
                    this.on('drop', function(event) {
                        $(".ajaxLoader").show();
                    });
                    this.on('uploadprogress', function(event) {
                        $(".ajaxLoader").show();
                    });
                    this.on('addedfile', function(event) {
                        $(".ajaxLoader").show();
                    });
                },
            });
    }
    if ($("#TattooDropzone").length) {
        // $("#dashboardDropzone").addClass('dropzone');
        var myDropzone = new Dropzone("#TattooDropzone", {
            // maxFiles: 1,
            autoProcessQueue: false,
            acceptedFiles: ".png,.jpg,.svg",
            chunking: true,
            forceChunking: true,
            chunkSize: 10000000,
            parallelChunkUploads: true,
            retryChunks: true,
            // previewsContainer: '.attachmentPreview',
            // init: function() {
            //     this.on("maxfilesreached",
            //         function(file) {
            //             $("#dashboardDropzone").css("pointer-events", "none");
            //         });
            //     this.on("error", function(file) {
            //         var type = file.type;
            //         if (!file.accepted) {
            //             alert("Something went wrong while uploading file. Please upload right file type with accepted extension as .pdf,.doc,.docx");
            //         }
            //         this.removeFile(file);
            //         $(".ajaxLoader").hide();
            //     });
            //     this.on('drop', function(event) {
            //         $(".ajaxLoader").show();
            //     });
            //     this.on('uploadprogress', function(event) {
            //         $(".ajaxLoader").show();
            //     });
            //     this.on('addedfile', function(event) {
            //         $(".ajaxLoader").show();
            //     });
            // },
        });
}
    
    // filterBtn();
    $(".select-entity-wrap a").click(function () {
        $(".entity-title").hide();
        $(this).closest("li").hide().siblings("li").hide();
        $(".back-to-entity").show();
        var thisVal = $(this).attr("data-attr");
        $( ".entity-type" ).each(function( ) {
            thisEntity = $(this);
            if(thisEntity.attr("data-target") == thisVal){
                thisEntity.show();
            }
        });
    })
    $(".back-to-entity").click(function () {
        $(".entity-title").show();
        $(".select-entity-wrap li").show();
        $(".back-to-entity").hide();
        $(".entity-type").hide();
    })

    $(".add-section-btn").click(function () {
        $(".back-to-entity").hide();
        var thisVal = $(this).attr("data-btn");
        $( ".add-section" ).each(function( ) {
            thisSection = $(this);
            if(thisSection.hasClass(thisVal +'-wrap')){
                thisSection.show();
            }
        });
        $(".entity-type").hide();
        filterBtn();
    })
    $(".back-to-entity-type").click(function () {
         $(".back-to-entity").show();
         var str = $(this).closest('.add-section').attr('class');
         str = str.split(' ')[1];
         str = str.split('-')[1];
         $(".entity-type[data-target='"+ str +"-entity']").show();
         $(".add-section").hide();
    });
    $(".save-new").click(function () {
        var thisSave = $(this).attr("data-save");
         $(".add-"+ thisSave +"-wrap").show();
         $(".new-"+ thisSave +"-wrap").hide();
    })

    $(".new-section-btn").click(function () {
        $(".add-section").hide();
        var thisVal = $(this).attr("data-btn");
        $( ".new-section" ).each(function( ) {
            thisSection = $(this);
            if(thisSection.hasClass(thisVal +'-wrap')){
                thisSection.show();
            }
        });
    })
    $("#deceased-checkbox").change(function() {
        if(this.checked) {
            $(".deceased-details").show();
        }else{
            $(".deceased-details").hide();
        }
    });
    $(".advanced-search-btn").click(function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        $(".advanced-search-wrap").addClass("open");
        $(".search-overlay").show();
        $("body,html,.main_section").css("overflow","hidden");
    })
    $(".advanced-close").click(function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        $(".advanced-search-wrap").removeClass("open");
        $(".search-overlay").hide();
        $("body,html,.main_section").css("overflow","auto");
    });

    $('table.datatable').DataTable({
        "paging": false,
        "lengthChange": true,
        "searching": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
        }],
        // dom: "<<t><<'table-footer' <pl>i>>>",
        "language": {
            "paginate": {
                "previous": "<i class='icon-angle-left page-arrow align-middle mr-2'></i>",
                "next": "<i class='icon-angle-right page-arrow align-middle ml-2'></i> "
            }
        },
    });
    $('table.datatable-paging').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
        }],
        dom: "<<t><<'table-footer' <pl>i>>>",
        "language": {
            "paginate": {
                "previous": "<i class='icon-angle-left page-arrow align-middle mr-2'></i>",
                "next": "<i class='icon-angle-right page-arrow align-middle ml-2'></i> "
            }
        },
    });
    $("#effectiveTo").change(function() {
        if(this.checked) {
            $("#effectiveToDatepicker").prop("disabled", false);
        }else{
            $("#effectiveToDatepicker").prop("disabled", true);
        }
    });
    if ($("#multiselect").length) {
        $('#multiselect').multiselect();
    }

    $(".search-card").click(function(e){
        e.stopImmediatePropagation();
        $(this).toggleClass('open');
    })
    $(".search-outer").click(function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
    })
});

function nextTab(elem) {
    elem.addClass("completed");
    if (elem.next().index() != 0) {
        $(".prev-step").removeAttr("disabled");
    }
    if (elem.next().index() == (elem.closest("ul").find("li").length - 1)) {
        $(".next-step .nextstep-text").text('Done');
    }
    elem.next().find('a[data-toggle="tab"]').tab('show');
    elem.next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    elem.removeClass("completed");
    if (elem.prev().index() == 0) {
        $(".prev-step").attr('disabled', 'disabled');
    }
    if (elem.prev().index() <= (elem.closest("ul").find("li").length - 1)) {
        $(".next-step .nextstep-text").text('Next');
    }
    elem.prev().find('a[data-toggle="tab"]').tab('show');
    elem.prev().find('a[data-toggle="tab"]').click();
}

function filterBtn(){
    if ($(".filter-btn").length){
            var filterBtnHeight = $(".filter-btn").innerHeight();
            if($(window).width() < 768){
                $(".main_section").css({"padding-bottom": filterBtnHeight});
            }            
            $(".filter-btn").click(function(){
                $("body,html,.main_section").addClass("is-filter-open");                
                $(".search-card").fadeIn();
            })
        }
         $(".filter-cancel-icon").click(function(){
            if ($("body,html,.main_section").hasClass("is-filter-open")){
                $("body,html,.main_section").removeClass("is-filter-open")
                $(".search-card").fadeOut();
            }
        })
}