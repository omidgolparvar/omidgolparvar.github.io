
$(document).ready(function() {
  
  ShowContentHolder();
  
  MenuButtonInit();
  
  GetArticles();
  
  SearchArticles();
  
});

function PanelsInit() {
  
}

function MenuButtonInit() {
  $(document).on('click', '#menu a.btn', function(event) {
    event.preventDefault();
    $('#menu a.btn.active').removeClass('active');
    $(this).addClass('active');
    var _href = $(this).attr('href').replace('#','');
    $('#content-holder').fadeOut(250).delay(50).fadeIn(250);
    setTimeout(function() {
      ChangePanel(_href);
    }, 300);
  })
}

function ChangePanel(panel) {
  $('[id^="panel"]').each(function(index, element) {
    var _panel_name = $(element).data('panel');
    if (_panel_name == panel) {
      $(element).addClass('show').removeClass('hide');
      return;
    } else {
      $(element).addClass('hide').removeClass('show');
    }
  });
}

function ShowContentHolder() {
  setTimeout(function() {
    $('#content-holder').fadeIn(1000);
  }, 800);
}


function GetArticles() {
  if (Articles == undefined) return;
  
  console.log(Articles.length);
  $.each(Articles, function(index, element) {
    element.Keywords = element.Keywords.replace(/\|/g, '، ')
  })
  
  var AllArticles = {};
  AllArticles.AllArticles = Articles;
  
  $('#single-article-template').tmpl(AllArticles).appendTo('#all-articles');
  
  Remove_nbsp();
  
}

function Remove_nbsp() {
  var _all_article_abstracts = $('.article-abstract');
  $.each(_all_article_abstracts, function (index, element) {
    $(this).html( $(this).html().replace(/&nbsp;/gi,''));
  });
}

function SearchArticles() {
  $('#search-form-input')
    .on('keydown', function(event) {
      var _string = $(this).val();
      if (_string == "" && event.keyCode == 32) event.preventDefault();
    })
    .on('keyup', function(event) {
      var _string = $(this).val().trim().replace(/ي/g,'ی').replace(/ك/g,'ک');
      var _all_articles = $('.single-article');
      
      $.each(_all_articles, function (index, element) {
        var _code = $(element).find('.article-code').html().toLowerCase();
        var _title = $(element).find('.article-title').html().toLowerCase();
        var _authors = $(element).find('.article-authors').html().toLowerCase();
        if (_code.search(_string) != -1 || 
            _title.search(_string) != -1 ||
            _authors.search(_string) != -1) {
          $(element).removeClass('hide'); 
        } else {
          $(element).addClass('hide');
        }
      })
      
    })
  
}