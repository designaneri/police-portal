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
    
    // $('.nav-tabs > li a[title]').tooltip();

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
    // $('.arrow-scrollable-tabs').scrollingTabs({
    //   cssClassLeftArrow: 'far fa-chevron-left',
    //   cssClassRightArrow: 'far fa-chevron-right'
    // });

    // Editable Label
    $('.edit-text-icon').click(function() {
        var thisGroup = $(this).closest(".editable-label");
        var text = thisGroup.find('.text-info').text();
        var input = $('<input value="' + text + '" />')
        thisGroup.find('.text-info').text('').append(input);
        input.select();
        thisGroup.find('.edit-text-icon').hide();
        thisGroup.find('.save-text-icon').css("display","inline-block");
        thisGroup.addClass("is-editing");
    });
     $('.save-text-icon').click(function() {
        var thisGroup = $(this).closest(".editable-label");
         var text = thisGroup.find('input').val();
            thisGroup.find('.text-info').text(text);
            thisGroup.find('input').remove();
            thisGroup.find('.save-text-icon').hide();
            thisGroup.find('.edit-text-icon').css("display","inline-block");
            thisGroup.removeClass("is-editing");
    });

     // tooltips
     $('[data-toggle="tooltip"]').tooltip();

     $('.datepicker').datepicker();

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
    filterBtn();
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
    $(".add-person").click(function () {
         $(".back-to-entity").hide();
        $(".add-person-wrap").show();
        $(".entity-type").hide();
        filterBtn();
    });
    $(".back-to-person").click(function () {
         $(".back-to-entity").show();
         $(".entity-type[data-target='people-entity']").show();
         $(".add-person-wrap").hide();
    });
    $(".save-person").click(function () {
         $(".add-person-wrap").show();
         $(".new-person-wrap").hide();
    })

    $(".new-person").click(function () {
        $(".add-person-wrap").hide();
        $(".new-person-wrap").show();
          // $('.arrow-scrollable-tabs').scrollingTabs('refresh');
    });
    $("#deceased-checkbox").change(function() {
        if(this.checked) {
            $(".deceased-details").show();
        }else{
            $(".deceased-details").hide();
        }
    });
    $(".advanced-search-btn").click(function () {
        $(".advanced-search-wrap").addClass("open");
        $(".search-overlay").show();
        $("body,html,.main_section").css("overflow","hidden");
    })
    $(".advanced-close").click(function () {
        $(".advanced-search-wrap").removeClass("open");
        $(".search-overlay").hide();
        $("body,html,.main_section").css("overflow","auto");
    });
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