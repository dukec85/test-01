/*
 * Slides, A Slideshow Plugin for jQuery
 * Intructions: http://slidesjs.com
 * By: Nathan Searles, http://nathansearles.com
 * Version: 1.1.8
 * Updated: June 1st, 2011
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function (A) {
  A.fn.slides = function (B) {
    B = A.extend({}, A.fn.slides.option, B);
    return this.each(function () {
      A("." + B.container, A(this)).children().wrapAll('<div class="slides_control"/>');
      var V = A(this),
        J = A(".slides_control", V),
        Z = J.children().size(),
        Q = J.children().outerWidth(),
        M = J.children().outerHeight(),
        D = B.start - 1,
        L = B.effect.indexOf(",") < 0 ? B.effect : B.effect.replace(" ", "").split(",")[0],
        S = B.effect.indexOf(",") < 0 ? L : B.effect.replace(" ", "").split(",")[1],
        O = 0,
        N = 0,
        C = 0,
        P = 0,
        U, H, I, X, W, T, K, F;

      function E(c, b, a) {
        if (!H && U) {
          H = true;
          B.animationStart(P + 1);
          switch (c) {
          case "next":
            N = P;
            O = P + 1;
            O = Z === O ? 0 : O;
            X = Q * 2;
            c = -Q * 2;
            P = O;
            break;
          case "prev":
            N = P;
            O = P - 1;
            O = O === -1 ? Z - 1 : O;
            X = 0;
            c = 0;
            P = O;
            break;
          case "pagination":
            O = parseInt(a, 10);
            N = A("." + B.paginationClass + " li." + B.currentClass + " a", V).attr("href").match("[^#/]+$");
            if (O > N) {
              X = Q * 2;
              c = -Q * 2;
            } else {
              X = 0;
              c = 0;
            }
            P = O;
            break;
          }
          if (b === "fade") {
            if (B.crossfade) {
              J.children(":eq(" + O + ")", V).css({
                zIndex: 10
              }).fadeIn(B.fadeSpeed, B.fadeEasing, function () {
                if (B.autoHeight) {
                  J.animate({
                    height: J.children(":eq(" + O + ")", V).outerHeight()
                  }, B.autoHeightSpeed, function () {
                    J.children(":eq(" + N + ")", V).css({
                      display: "none",
                      zIndex: 0
                    });
                    J.children(":eq(" + O + ")", V).css({
                      zIndex: 0
                    });
                    B.animationComplete(O + 1);
                    H = false;
                  });
                } else {
                  J.children(":eq(" + N + ")", V).css({
                    display: "none",
                    zIndex: 0
                  });
                  J.children(":eq(" + O + ")", V).css({
                    zIndex: 0
                  });
                  B.animationComplete(O + 1);
                  H = false;
                }
              });
            } else {
              J.children(":eq(" + N + ")", V).fadeOut(B.fadeSpeed, B.fadeEasing, function () {
                if (B.autoHeight) {
                  J.animate({
                    height: J.children(":eq(" + O + ")", V).outerHeight()
                  }, B.autoHeightSpeed, function () {
                    J.children(":eq(" + O + ")", V).fadeIn(B.fadeSpeed, B.fadeEasing);
                  });
                } else {
                  J.children(":eq(" + O + ")", V).fadeIn(B.fadeSpeed, B.fadeEasing, function () {
                    if (A.browser.msie) {
                      A(this).get(0).style.removeAttribute("filter");
                    }
                  });
                }
                B.animationComplete(O + 1);
                H = false;
              });
            }
          } else {
            J.children(":eq(" + O + ")").css({
              left: X,
              display: "block"
            });
            if (B.autoHeight) {
              J.animate({
                left: c,
                height: J.children(":eq(" + O + ")").outerHeight()
              }, B.slideSpeed, B.slideEasing, function () {
                J.css({
                  left: -Q
                });
                J.children(":eq(" + O + ")").css({
                  left: Q,
                  zIndex: 5
                });
                J.children(":eq(" + N + ")").css({
                  left: Q,
                  display: "none",
                  zIndex: 0
                });
                B.animationComplete(O + 1);
                H = false;
              });
            } else {
              J.animate({
                left: c
              }, B.slideSpeed, B.slideEasing, function () {
                J.css({
                  left: -Q
                });
                J.children(":eq(" + O + ")").css({
                  left: Q,
                  zIndex: 5
                });
                J.children(":eq(" + N + ")").css({
                  left: Q,
                  display: "none",
                  zIndex: 0
                });
                B.animationComplete(O + 1);
                H = false;
              });
            }
          } if (B.pagination) {
            A("." + B.paginationClass + " li." + B.currentClass, V).removeClass(B.currentClass);
            A("." + B.paginationClass + " li:eq(" + O + ")", V).addClass(B.currentClass);
          }
        }
      }

      function R() {
        clearInterval(V.data("interval"));
      }

      function G() {
        if (B.pause) {
          clearTimeout(V.data("pause"));
          clearInterval(V.data("interval"));
          K = setTimeout(function () {
            clearTimeout(V.data("pause"));
            F = setInterval(function () {
              E("next", L);
            }, B.play);
            V.data("interval", F);
          }, B.pause);
          V.data("pause", K);
        } else {
          R();
        }
      }
      if (Z < 2) {
        return;
      }
      if (D < 0) {
        D = 0;
      }
      if (D > Z) {
        D = Z - 1;
      }
      if (B.start) {
        P = D;
      }
      if (B.randomize) {
        J.randomize();
      }
      A("." + B.container, V).css({
        overflow: "hidden",
        position: "relative"
      });
      J.children().css({
        position: "absolute",
        top: 0,
        left: J.children().outerWidth(),
        zIndex: 0,
        display: "none"
      });
      J.css({
        position: "relative",
        width: (Q * 3),
        height: M,
        left: -Q
      });
      A("." + B.container, V).css({
        display: "block"
      });
      if (B.autoHeight) {
        J.children().css({
          height: "auto"
        });
        J.animate({
          height: J.children(":eq(" + D + ")").outerHeight()
        }, B.autoHeightSpeed);
      }
      if (B.preload && J.find("img:eq(" + D + ")").length) {
        A("." + B.container, V).css({
          background: "url(" + B.preloadImage + ") no-repeat 50% 50%"
        });
        var Y = J.find("img:eq(" + D + ")").attr("src") + "?" + (new Date()).getTime();
        if (A("img", V).parent().attr("class") != "slides_control") {
          T = J.children(":eq(0)")[0].tagName.toLowerCase();
        } else {
          T = J.find("img:eq(" + D + ")");
        }
        J.find("img:eq(" + D + ")").attr("src", Y).load(function () {
          J.find(T + ":eq(" + D + ")").fadeIn(B.fadeSpeed, B.fadeEasing, function () {
            A(this).css({
              zIndex: 5
            });
            A("." + B.container, V).css({
              background: ""
            });
            U = true;
            B.slidesLoaded();
          });
        });
      } else {
        J.children(":eq(" + D + ")").fadeIn(B.fadeSpeed, B.fadeEasing, function () {
          U = true;
          B.slidesLoaded();
        });
      } if (B.bigTarget) {
        J.children().css({
          cursor: "pointer"
        });
        J.children().click(function () {
          E("next", L);
          return false;
        });
      }
      if (B.hoverPause && B.play) {
        J.bind("mouseover", function () {
          R();
        });
        J.bind("mouseleave", function () {
          G();
        });
      }
      if (B.generateNextPrev) {
        A("." + B.container, V).after('<a href="#" class="' + B.prev + '">Prev</a>');
        A("." + B.prev, V).after('<a href="#" class="' + B.next + '">Next</a>');
      }
      A("." + B.next, V).click(function (a) {
        a.preventDefault();
        if (B.play) {
          G();
        }
        E("next", L);
      });
      A("." + B.prev, V).click(function (a) {
        a.preventDefault();
        if (B.play) {
          G();
        }
        E("prev", L);
      });
      if (B.generatePagination) {
        if (B.prependPagination) {
          V.prepend("<ul class=" + B.paginationClass + "></ul>");
        } else {
          V.append("<ul class=" + B.paginationClass + "></ul>");
        }
        J.children().each(function () {
          A("." + B.paginationClass, V).append('<li><a href="#' + C + '">' + (C + 1) + "</a></li>");
          C++;
        });
      } else {
        A("." + B.paginationClass + " li a", V).each(function () {
          A(this).attr("href", "#" + C);
          C++;
        });
      }
      A("." + B.paginationClass + " li:eq(" + D + ")", V).addClass(B.currentClass);
      A("." + B.paginationClass + " li a", V).click(function () {
        if (B.play) {
          G();
        }
        I = A(this).attr("href").match("[^#/]+$");
        if (P != I) {
          E("pagination", S, I);
        }
        return false;
      });
      A("a.link", V).click(function () {
        if (B.play) {
          G();
        }
        I = A(this).attr("href").match("[^#/]+$") - 1;
        if (P != I) {
          E("pagination", S, I);
        }
        return false;
      });
      if (B.play) {
        F = setInterval(function () {
          E("next", L);
        }, B.play);
        V.data("interval", F);
      }
    });
  };
  A.fn.slides.option = {
    preload: false,
    preloadImage: "/img/loading.gif",
    container: "slides_container",
    generateNextPrev: false,
    next: "next",
    prev: "prev",
    pagination: true,
    generatePagination: true,
    prependPagination: false,
    paginationClass: "pagination",
    currentClass: "current",
    fadeSpeed: 350,
    fadeEasing: "",
    slideSpeed: 350,
    slideEasing: "",
    start: 1,
    effect: "slide",
    crossfade: false,
    randomize: false,
    play: 0,
    pause: 0,
    hoverPause: false,
    autoHeight: false,
    autoHeightSpeed: 350,
    bigTarget: false,
    animationStart: function () {},
    animationComplete: function () {},
    slidesLoaded: function () {}
  };
  A.fn.randomize = function (C) {
    function B() {
      return (Math.round(Math.random()) - 0.5);
    }
    return (A(this).each(function () {
      var F = A(this);
      var E = F.children();
      var D = E.length;
      if (D > 1) {
        E.hide();
        var G = [];
        for (i = 0; i < D; i++) {
          G[G.length] = i;
        }
        G = G.sort(B);
        A.each(G, function (I, H) {
          var K = E.eq(H);
          var J = K.clone(true);
          J.show().appendTo(F);
          if (C !== undefined) {
            C(K, J);
          }
          K.remove();
        });
      }
    }));
  };
})(jQuery);
