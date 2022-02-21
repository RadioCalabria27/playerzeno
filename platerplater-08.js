/*
LUNA RADIO PLAYER V5.20.07.07
https://www.luna-universe.com

Copyright (C) SODAH | JOERG KRUEGER
https://www.sodah.de

*/
(function(d, D) {
    "function" === typeof define && define.amd ? define(["jquery"], D) : d.jQuery ? D(d.jQuery) : D(d.Zepto)
})(this, function(d, D) {
    d.fn.lunaradio = function(m) {
        var w = "string" === typeof m,
            t = Array.prototype.slice.call(arguments, 1),
            K = this;
        m = !w && t.length ? d.extend.apply(null, [!0, m].concat(t)) : m;
        if (w && "_" === m.charAt(0)) return K;
        w ? this.each(function() {
            var G = d(this).data("lunaradio"),
                F = G && d.isFunction(G[m]) ? G[m].apply(G, t) : G;
            if (F !== G && F !== D) return K = F, !1
        }) : this.each(function() {
            d(this).data("lunaradio", new d.lunaradio(this,
                m))
        });
        return K
    };
    d.lunaradio = function(m, w) {
        function t(b, a) {
            if (b === D || "" == b.toString()) b = a;
            return b
        }

        function K() {
            if (!T()) {
                for (; B.lastElementChild;) B.removeChild(B.lastElementChild);
                B.load()
            }
        }

        function G() {
            if (T()) Ga || (B.src = Fa, B.load());
            else {
                var b = document.createElement("source");
                b.src = Fa;
                B.appendChild(b);
                B.load()
            }
            Ga = !0
        }

        function F() {
            B = new Audio;
            B.id = c + "html5audio";
            B.preload = "auto";
            B.addEventListener("timeupdate", function() {
                E("timeupdate: " + B.currentTime);
                0 == B.paused && (d("#" + c + "audiopreloader").fadeOut(0),
                    d("#" + c + "smallaudiopreloader").fadeOut(0))
            }, !1);
            B.addEventListener("loadedmetadata", function() {
                E("loadedmetadata")
            }, !1);
            B.addEventListener("ended", function() {
                K();
                G();
                R && B.play()["catch"](function() {
                    E("error on html5 play")
                });
                E("ended")
            }, !1);
            B.addEventListener("play", function() {
                Sa();
                E("play")
            }, !1);
            B.addEventListener("loadstart", function() {
                R && (d("#" + c + "audiopreloader").fadeIn(0), d("#" + c + "smallaudiopreloader").fadeIn(0));
                E("loadstart")
            }, !1);
            B.addEventListener("waiting", function() {
                d("#" + c + "audiopreloader").fadeIn(0);
                d("#" + c + "smallaudiopreloader").fadeIn(0);
                E("waiting")
            }, !1);
            B.addEventListener("seeked", function() {
                d("#" + c + "audiopreloader").fadeOut(0);
                d("#" + c + "smallaudiopreloader").fadeOut(0);
                E("seeked")
            }, !1);
            B.addEventListener("canplaythrough", function() {
                d("#" + c + "audiopreloader").fadeOut(0);
                d("#" + c + "smallaudiopreloader").fadeOut(0);
                d("#" + c + "iconlive, #" + c + "smalliconlive").css({
                    opacity: "1.0"
                });
                E("canplaythrough")
            }, !1);
            B.addEventListener("pause", function() {
                B.currentTime.toFixed(1) < B.duration.toFixed(1) && Ta();
                E("pause: currentTime: " +
                    B.currentTime.toFixed(1) + " duration: " + B.duration.toFixed(1))
            }, !1);
            B.addEventListener("error", function(b) {
                E(B.readyState);
                setTimeout(function() {
                    K();
                    G();
                    R && B.play()["catch"](function() {
                        E("error on html5 play")
                    })
                }, 1E3);
                d("#" + c + "iconlive, #" + c + "smalliconlive").css({
                    opacity: "0"
                })
            }, !0)
        }

        function N(b) {
            var a = document.createElement("link");
            a.type = "text/css";
            a.rel = "stylesheet";
            a.href = "https://fonts.googleapis.com/css?family=" + b;
            document.getElementsByTagName("head")[0].appendChild(a)
        }

        function P() {
            var b = document.getElementById(c);
            b.innerHTML = "";
            d("#" + c).addClass("lunaaudioplayer").css({
                overflow: "hidden",
                display: "block"
            });
            var a = document.createElement("div");
            a.id = c + "containerinside";
            b.appendChild(a);
            d("#" + c + "containerinside").css({
                position: "relative",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                background: kb
            });
            Fa = "true" == lb && "" != ua ? ua + Ha() : Ha();
            F();
            mb(a);
            "big" == ja ? nb(a) : ob(a);
            T() && (d("#" + c + "buttonvolumeoff, #" + c + "buttonvolumeon, #" + c + "volumegrab, #" + c + "textvolumeend, #" + c + "volumewrapper").css({
                display: "none"
            }), d("#" + c + "smallvolumegrab, #" +
                c + "smalltextvolume, #" + c + "smalliconvolume").css({
                display: "none"
            }));
            b = "ie" == ka.browser.name.toLowerCase() && 12 > parseInt(ka.browser.version) ? !0 : !1;
            b && d("#" + c + "backgroundimage").css({
                display: "none"
            });
            Ua();
            d(window).resize(function() {
                Ua(!1)
            });
            la();
            "true" == za ? (za = "false", z(ma, ""), za = "true") : z(ma, "");
            e();
            setInterval(function() {
                e()
            }, pb)
        }

        function e() {
            switch (fa) {
                case "ownmetadataurl":
                    H();
                    break;
                case "stream-icy-meta":
                    Q();
                    break;
                default:
                    switch (Va) {
                        case "icecast2":
                            J();
                            break;
                        case "shoutcast2":
                            na();
                            break;
                        case "radionomy":
                            S();
                            break;
                        case "radiojar":
                            Aa();
                            break;
                        case "radioco":
                            Ba()
                    }
            }
        }

        function p(b, a) {
            oa != d("<div/>").html(b).text() && (oa = d("<div/>").html(b).text(), E("New Title: " + oa), d("." + c + "texttitlespan, ." + c + "smalltexttitlespan").html(oa), "" == a ? y() : z(a, ""), Wa(!0))
        }



        function y() {
            if ("" != oa) {
                var b = oa.replace(/ *\([^)]*\) */g, ""),
                    a = b = "https://itunes.apple.com/search?term=" + encodeURIComponent(b) + "&media=music&limit=1",
                    //a = b = "https://itunes.apple.com/search?term=" + encodeURIComponent(b) + "&media=music&limit=1&url=" + encodeURIComponent(Y),
                    h = a,
                    f = "GET";
                T() && (f = "POST", h = Y + "fallback.php", a = b);
                E("ITUNES: " + h);
                d.ajax({
                    dataType: "jsonp",
                    method: f,
                    crossDomain: !0,
                    url: h,
                    data: {
                        url: a
                    },
                    success: function(k) {
                        try {
                            //k = JSON.parse(k);
                            var v = "",
                                A = "";
                            1 == k.results.length ? (v = k.results[0].artworkUrl100, v = v.replace("100x100bb", "600x600bb"), E("COVER: " + v), "" != Xa && (A = k.results[0].trackViewUrl + "&app=itunes&at=" + Xa), z(v, A)) : z(ma, "")
                        } catch (L) {
                            z(ma, "")
                        }
                    },
                    error: function() {
                        z(ma, "")
                    }
                })
            } else z(ma, "")
        }



        function z(b, a) {
            "false" == za && (pa = a, "" != pa ? d("#" + c + "coverwrapper, #" + c + "smallcoverwrapper").css({
                    cursor: "pointer"
                }) : d("#" + c + "coverwrapper, #" + c + "smallcoverwrapper").css({
                    cursor: "hand"
                }),
                ha++, 2 < ha && (ha = 1), d("<img/>").attr("src", b).on("load", function() {
                    d(this).remove();
                    d("#" + c + "backgroundimage" + ha + ", #" + c + "coverwrapper" + ha + ", #" + c + "smallcoverwrapper" + ha).css({
                        background: "url(" + b + ")",
                        opacity: "1.0",
                        "background-repeat": "no-repeat",
                        "background-size": "cover"
                    });
                    1 == ha ? d("#" + c + "backgroundimage2, #" + c + "coverwrapper2, #" + c + "smallcoverwrapper2").css({
                        opacity: "0.0"
                    }) : d("#" + c + "backgroundimage1, #" + c + "coverwrapper1, #" + c + "smallcoverwrapper1").css({
                        opacity: "0.0"
                    })
                }))
        }

        function H() {
            var b = "GET",
                a = qb,
                h = a,
                f = {};
            "corsproxy" == fa && (b = "GET", h = a = ua + a, f = {});
            "fallback" == fa && (b = "POST", h = Y + "fallback.php", f = {
                url: a
            });
            d.ajax({
                dataType: "text",
                method: b,
                crossDomain: !0,
                url: h,
                data: f,
                success: function(k) {
                    p(k, "")
                },
                error: function(k, v, A) {
                    p("", "")
                }
            })
        }

        function Q() {
            var b = Ha();
            d.ajax({
                dataType: "text",
                url: Y + "stream-icy-meta.php",
                method: "POST",
                crossDomain: !0,
                data: {
                    url: b
                },
                success: function(a) {
                    p(a, "")
                },
                error: function(a, h, f) {
                    p("", "")
                }
            })
        }

        function J() {
            var b = "GET",
                a = Z + "/status-json.xsl",
                h = a,
                f = {};
            "corsproxy" == fa && (b = "GET", h = a = ua +
                a, f = {});
            "fallback" == fa && (b = "POST", h = Y + "fallback.php", f = {
                url: a
            });
            d.ajax({
                dataType: "text",
                method: b,
                crossDomain: !0,
                url: h,
                data: f,
                success: function(k) {
                    try {
                        k = JSON.parse(k);
                        var v = {};
                        if (k.icestats.source.length === D) v = k.icestats.source;
                        else
                            for (var A = 0; A < k.icestats.source.length; A++) {
                                var L = k.icestats.source[A].listenurl;
                                Ca == L.substr(L.length - Ca.length, Ca.length) && (v = k.icestats.source[A])
                            }
                        A = k = "";
                        v.hasOwnProperty("title") && (A = v.title);
                        v.hasOwnProperty("artist") && (k = v.artist);
                        "" != k && "" != A ? p(k + " - " + A, "") : "" !=
                            k ? p(k, "") : p(A, "")
                    } catch (I) {
                        E("Error on JSON File: " + I), p("", "")
                    }
                },
                error: function(k, v, A) {
                    E("Error on JSON File: " + v);
                    p("", "")
                }
            })
        }




        /*
        function na() {
        var b = "GET",
        a = Z + "/currentsong?sid=" + rb,
        h = a,
        f = {};
        "corsproxy" == fa && (b = "GET", h = a = ua + a, f = {});
        "fallback" == fa && (b = "POST", h = Y + "fallback.php", f = {url: a});

        d.ajax({
        dataType: "text",
        method: b,
        crossDomain: !0,
        url: h,
        data: f,
        success: function(k) {
        p(k, "")
        },
        error: function(k, v, A) {
        p("", "")
        }
        })
        }
        */




        function na() {
            var b = "GET",
                a = Z + "/stats?json=1&sid=" + rb,
                h = a,
                f = {};
            "corsproxy" == fa && (b = "GET", h = a = ua + a, f = {});
            "fallback" == fa && (b = "POST", h = Y + "fallback.php", f = {
                url: a
            });

            d.ajax({
                dataType: "jsonp",
                method: b,
                crossDomain: !0,
                url: h,
                data: f,
                success: function(k) {
                    p(k.songtitle, "")
                },
                error: function(k, v, A) {
                    p("", "")
                }
            })
        }

        function S() {
            d.ajax({
                dataType: "xml",
                method: "GET",
                crossDomain: !0,
                url: "https://api.radionomy.com/currentsong.cfm?radiouid=" +
                    sb + "&apikey=" + tb + "&callmeback=yes&type=xml&cover=yes&previous=yes",
                success: function(b) {
                    try {
                        var a = d(b).find("track").find("artists").text();
                        d(b).find("track").find("title").text() != d(b).find("track").find("artists").text() && (a += " - " + d(b).find("track").find("title").text());
                        var h = d(b).find("track").find("cover").text();
                        p(a, h)
                    } catch (f) {
                        p("", "")
                    }
                },
                error: function(b, a, h) {
                    p("", "")
                }
            })
        }

        function zc() {
a.ajax({
type: "GET",
crossDomain: !0,
cache: !1,
url: "https://tools.zenoradio.com/api/stations/r950k185hwzuv/now_playing/?rand=" + Math.random(),
dataType: "json",
async: !0,
success: function(a) {
if (a) try {
var b = a.artist + " - " + a.title;
v != b && (v = b, ya(), "small" == y ? P() : (M = a.artist, N = a.title, l(), H()))
} catch (A) {}
},
error: function(a, b, c) {}
})
}
        function Ba() {
            d.ajax({
                dataType: "text",
                method: "GET",
                crossDomain: !0,
                url: "https://public.radio.co/stations/" + vb + "/status",
                success: function(b) {
                    try {
                        var a = JSON.parse(b);
                        p(a.current_track.title, a.current_track.artwork_url_large)
                    } catch (h) {
                        p("", "")
                    }
                },
                error: function(b, a, h) {
                    p("", "")
                }
            })
        }

        function mb(b) {
            l = document.createElement("canvas");
            l.id = c + "canvas";
            b.appendChild(l);
            d("#" + c + "canvas").css({
                display: "block",
                background: "none",
                position: "absolute",
                top: "0px"
            });
            g = l.getContext("2d")
        }

        function nb(b) {
            var a = document.createElement("div");
            a.id = c + "playerwrapper";
            b.appendChild(a);
            d("#" + c + "playerwrapper").css({
                overflow: "hidden",
                display: "block",
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%"
            });
            wb(a);
            m = document.createElement("div");
            m.id = c + "iconlive";
            a.appendChild(m);
            d("#" + c + "iconlive").css({
                position: "absolute",
                fill: "rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.3)"
            }).html('<svg x="0px" y="0px" viewBox="-16 0 512 512.00113" ><path d="m262.84375 140.558594c-12.699219 12.671875-33.28125 12.671875-45.980469 0-12.695312-12.671875-12.695312-33.21875 0-45.890625 12.699219-12.671875 33.28125-12.671875 45.980469 0 12.695312 12.671875 12.695312 33.21875 0 45.890625zm0 0"/><path d="m307.257812 189.726562c-3.960937 0-7.921874-1.511718-10.9375-4.539062-6.03125-6.039062-6.019531-15.824219.019532-21.851562 12.238281-12.214844 18.976562-28.453126 18.976562-45.722657s-6.738281-33.507812-18.976562-45.722656c-6.039063-6.03125-6.050782-15.8125-.019532-21.855469 6.027344-6.039062 15.8125-6.050781 21.851563-.019531 18.089844 18.054687 28.050781 42.058594 28.050781 67.597656 0 25.535157-9.960937 49.542969-28.050781 67.597657-3.015625 3.011718-6.964844 4.515624-10.914063 4.515624zm0 0"/><path d="m342.210938 235.222656c-3.960938 0-7.921876-1.511718-10.9375-4.535156-6.03125-6.042969-6.019532-15.824219.019531-21.855469 24.414062-24.367187 37.863281-56.761719 37.863281-91.21875s-13.449219-66.851562-37.863281-91.21875c-6.039063-6.03125-6.050781-15.8125-.019531-21.855469 6.03125-6.039062 15.8125-6.050781 21.851562-.019531 30.265625 30.207031 46.9375 70.371094 46.933594 113.09375 0 42.722657-16.667969 82.890625-46.933594 113.097657-3.015625 3.007812-6.964844 4.511718-10.914062 4.511718zm0 0"/><path d="m172.371094 189.726562c-3.949219 0-7.898438-1.503906-10.917969-4.515624-18.089844-18.054688-28.050781-42.0625-28.050781-67.597657 0-25.539062 9.960937-49.542969 28.050781-67.597656 6.039063-6.03125 15.824219-6.023437 21.851563.019531 6.03125 6.039063 6.019531 15.824219-.019532 21.855469-12.238281 12.214844-18.976562 28.453125-18.976562 45.722656s6.738281 33.507813 18.976562 45.722657c6.039063 6.027343 6.050782 15.8125.019532 21.851562-3.015626 3.023438-6.976563 4.539062-10.933594 4.539062zm0 0"/><path d="m137.417969 235.222656c-3.953125 0-7.902344-1.503906-10.917969-4.515625-30.265625-30.207031-46.933594-70.371093-46.933594-113.09375 0-42.726562 16.667969-82.890625 46.933594-113.097656 6.039062-6.027344 15.824219-6.019531 21.851562.023437 6.03125 6.039063 6.019532 15.820313-.019531 21.851563-24.414062 24.367187-37.863281 56.761719-37.863281 91.21875s13.449219 66.855469 37.863281 91.222656c6.039063 6.03125 6.050781 15.8125.019531 21.855469-3.015624 3.023438-6.976562 4.535156-10.933593 4.535156zm0 0"/><path d="m443.480469 261.9375h-407.332031c-19.964844 0-36.148438 16.183594-36.148438 36.144531v177.769531c0 19.964844 16.183594 36.148438 36.148438 36.148438h407.328124c19.964844 0 36.148438-16.183594 36.148438-36.148438v-177.769531c0-19.960937-16.183594-36.144531-36.144531-36.144531zm-324.609375 203.683594h-56.933594c-8.53125 0-15.449219-6.917969-15.449219-15.453125v-126.398438c0-8.53125 6.917969-15.453125 15.449219-15.453125 8.535156 0 15.453125 6.917969 15.453125 15.453125v110.945313h41.480469c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.535156-6.917969 15.453125-15.453125 15.453125zm63.328125-15.453125c0 8.535156-6.917969 15.453125-15.453125 15.453125s-15.453125-6.917969-15.453125-15.453125v-126.398438c0-8.53125 6.917969-15.453125 15.453125-15.453125s15.453125 6.917969 15.453125 15.453125zm130.015625-121.929688-38.160156 126.394531c-.003907.011719-.007813.023438-.011719.035157-4.144531 14.144531-25.273438 13.796875-29.5625 0-.003907-.011719-.007813-.023438-.011719-.035157l-38.160156-126.394531c-2.464844-8.171875 2.15625-16.792969 10.328125-19.261719 8.164062-2.464843 16.792969 2.15625 19.257812 10.328126l23.367188 77.394531 23.367187-77.394531c2.46875-8.171876 11.089844-12.796876 19.261719-10.328126 8.167969 2.46875 12.792969 11.089844 10.324219 19.261719zm95.066406 35.320313c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.53125-6.917969 15.453125-15.453125 15.453125h-43.851562v40.25h52.175781c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.535156-6.917969 15.453125-15.453125 15.453125h-67.628907c-8.535156 0-15.453124-6.917969-15.453124-15.453125v-126.398438c0-8.53125 6.917968-15.453125 15.453124-15.453125h69.710938c8.53125 0 15.453125 6.917969 15.453125 15.453125 0 8.535157-6.921875 15.453125-15.453125 15.453125h-54.261719v24.335938zm0 0"/></svg>').lunaradiodisableSelection();
            m = document.createElement("div");
            m.id = c + "buttonvolumeoff";
            a.appendChild(m);
            d("#" + c + "buttonvolumeoff").css({
                position: "absolute",
                transition: "fill 0.5s",
                cursor: "pointer",
                fill: x
            }).html('<svg x="0px" y="0px"\t viewBox="0 0 800 800" ><path d="M401.2,400c0,72.2,0,144.4,0,216.5c0,12-3.1,22.6-13.3,29.9c-13.4,9.6-31.1,8-42.8-3.7c-36.7-36.6-73.4-73.3-109.9-110.1\tc-4.5-4.6-9-6.3-15.3-6.2c-41.3,0.3-82.7,0.2-124,0.1c-15.7,0-27-8.6-31-23.8c-1.1-4-1.4-8.4-1.4-12.6c-0.1-60.2-0.1-120.4,0-180.6\tc0-11.1,2.3-21.5,11.7-28.9c6.5-5.1,13.8-7.3,22-7.3c41.6,0,83.3-0.1,124.9,0.1c4.7,0,8.1-1.2,11.5-4.7\tc37-37.2,74.1-74.3,111.2-111.3c16.1-16,41.4-12.8,52.5,6.9c3.5,6.1,3.9,13.1,3.9,20c0,69.5,0,139.1,0,208.6\tC401.2,395.3,401.2,397.7,401.2,400z"/><path d="M685.2,526.5c-7.3,0.4-12.8-2.6-17.5-7.4c-18-18-36-35.9-53.9-54c-3.1-3.1-4.6-2.8-7.5,0.1c-17.5,17.8-35.3,35.4-52.9,53.1\tc-5.2,5.2-11.2,8.5-19,8.3c-7-0.2-12.3-3.3-17-7.9c-8.9-8.7-17.6-17.5-26.4-26.3c-10.3-10.5-10.3-24.6,0.2-35.1\tc17.8-17.9,35.7-35.8,53.7-53.6c3-3,2.9-4.6,0-7.6c-17.7-17.4-35.2-35.1-52.8-52.6c-11-11-12.2-22.8-2-34.5\tc9.3-10.6,19.1-20.9,30.2-29.8c10.9-8.7,23.1-7.6,33,2.3c17.8,17.7,35.6,35.5,53.3,53.4c2.8,2.8,4.3,3,7.2,0.1\tc17.6-17.9,35.4-35.6,53.2-53.4c8.8-8.8,19.4-10.5,29.5-5c1.7,0.9,3.1,2.2,4.4,3.5c9.4,9.4,18.8,18.8,28.2,28.2\tc10,10,10.1,24.1,0,34.2c-17.8,17.9-35.7,35.8-53.7,53.6c-2.9,2.9-3.2,4.5-0.1,7.6c17.7,17.4,35.2,35.1,52.8,52.6\tc6.3,6.3,9.6,13.7,8.1,22.9c-0.9,5.6-3.9,10-7.7,13.9c-8.5,8.7-17,17.3-25.7,25.7C697.8,523.6,692.1,527,685.2,526.5z"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).on("click", function() {
                Ia(0)
            }).lunaradiodisableSelection();
            m = document.createElement("div");
            m.id = c + "buttonvolumeon";
            a.appendChild(m);
            d("#" + c + "buttonvolumeon").css({
                position: "absolute",
                transition: "fill 0.5s",
                cursor: "pointer",
                fill: x
            }).html('<svg x="0px" y="0px" viewBox="0 0 800 800"><path d="M359.2,397.1c0,71.7,0,143.3,0,215c0,9.1-1.2,17.7-7.7,24.8c-13.8,14.9-34.2,15.1-49.1,0.3c-32.2-32.1-64.3-64.3-96.4-96.4\tc-4.8-4.8-9.8-9.6-14.5-14.6c-2.6-2.8-5.3-3.9-9.1-3.9c-42.4,0.1-84.8,0.1-127.1,0.1c-15.4,0-27.1-8.9-31.2-23.6\tc-1.1-4.1-1.4-8.3-1.4-12.5c0-60,0-120,0-180c0-14.4,4.6-26.3,18.5-32.9c5.1-2.4,10.6-3.1,16.1-3.1c41.5,0,83,0,124.5,0.1\tc4.2,0,7.1-1.2,9.9-4.1c36.8-36.9,73.6-73.8,110.6-110.6c10.5-10.5,23.1-14.1,37.2-8.3c11.2,4.6,17.9,13.1,19.1,25.5\tc0.5,5.1,0.6,10.2,0.6,15.3C359.2,257.5,359.2,327.3,359.2,397.1z"/><path d="M777.4,394.2c-0.2,41.1-5.6,79-17.7,115.8c-14.5,44.1-36,84.5-65.7,120.4c-9.1,11-18.2,22-28.8,31.6\tc-18.1,16.5-36.4,32.7-57.7,44.9c-19.1,10.9-43.9-1.6-46.9-23.4c-2-14.2,3.3-25.2,14.9-32.9c20.8-13.9,39.6-30.1,56.6-48.4\tc14.9-16,27.8-33.6,38.9-52.5c18.2-31,30.2-64.2,36.7-99.4c3.8-20.4,5.4-41,4.8-61.7c-1.2-42.3-10.6-82.8-28.5-121.1\tc-11.2-23.9-25.5-46-42.4-66.4c-19.8-23.8-43.3-43.3-68.4-61.2c-12.4-8.9-16.3-23.7-10.8-38.1c5.1-13.3,17.6-20.8,32.5-19.9\tc6.1,0.4,11.3,2.4,16.3,5.6c21.2,13.8,40.9,29.5,58.5,47.5c34.5,35.1,61.6,75.3,80.2,121.1c13.4,33,22,67.1,25.4,102.5\tC776.7,371.4,776.9,384.1,777.4,394.2z"/><path d="M652.1,392.3c-0.7,56.6-15.7,104.9-47.2,147.9c-17.4,23.7-38.4,43.6-63.2,59.5c-14.3,9.1-29.1,8.5-41-2\tc-11.9-10.5-13.8-29.9-4.5-42.9c3.9-5.5,9.5-8.9,14.8-12.6c35.3-24.8,59.1-57.9,70.4-99.4c10.8-39.8,8-78.9-8.4-116.9\tc-9.9-22.8-24-42.5-41.9-59.5c-8.8-8.4-18.8-15.1-28.6-22.1c-11-7.9-15.3-24.6-9.9-37.3c6.2-14.7,19.2-22,34-20.1\tc11.1,1.5,19.2,8.3,27.5,14.4c10.7,7.8,20.8,16.3,29.9,26.1c19.7,21.3,36.2,44.6,47.8,71.4c9.2,21.3,15.2,43.4,18.3,66.3\tC651.3,375.2,651.6,385.5,652.1,392.3z"/><path d="M526.4,394.8c-0.1,30.3-9.9,54.9-27.8,76.5c-9,10.8-19.7,19.4-32.1,25.8c-21.2,11-44.2-0.7-47.6-24.3\tc-1.7-12.2,3.1-22.4,13.1-29.5c7.1-5.1,14.6-9.7,19.8-16.9c17.6-24.1,12-55.7-12.8-72.4c-3.4-2.3-7-4.3-9.9-7.1\tc-12.5-11.6-14.1-29.7-4.1-43.1c10-13.3,28-16.9,42.6-8.2c31.6,18.7,51,46.1,57.3,82.4C526.1,384.3,526.7,390.6,526.4,394.8z"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).on("click", function() {
                Ia(100)
            }).lunaradiodisableSelection();
            m = document.createElement("div");
            m.id = c + "buttonanalyzer";
            a.appendChild(m);
            d("#" + c + "buttonanalyzer").css({
                position: "absolute",
                transition: "fill 0.5s",
                cursor: "pointer",
                fill: x
            }).html('<svg  x="0px" y="0px"\t viewBox="0 0 800 800"><path d="M180.3,729.4h-72.4c-13.5,0-24.5-11-24.5-24.5V235.8c0-13.5,11-24.5,24.5-24.5h72.4c13.5,0,24.5,11,24.5,24.5v469.1\tC204.7,718.4,193.7,729.4,180.3,729.4"/><path d="M351,729.4h-72.4c-13.5,0-24.5-11-24.5-24.5V331.7c0-13.5,11-24.5,24.5-24.5H351c13.5,0,24.5,11,24.5,24.5v373.2\tC375.4,718.4,364.4,729.4,351,729.4"/><path d="M521.9,729.4h-72.4c-13.5,0-24.5-11-24.5-24.5V95.1c0-13.5,11-24.5,24.5-24.5h72.4c13.5,0,24.5,11,24.5,24.5v609.8\tC546.3,718.4,535.3,729.4,521.9,729.4"/><path d="M692.1,729.4h-72.4c-13.5,0-24.5-11-24.5-24.5V331.7c0-13.5,11-24.5,24.5-24.5h72.4c13.5,0,24.5,11,24.5,24.5v373.2\tC716.6,718.4,705.6,729.4,692.1,729.4"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).on("click", function() {
                "none" != d("#" + c + "buttonshuffle").css("pointer-events") && (qa = parseInt(qa) + 1, 9 < qa && (qa = 0), E("changeanalyzer: " + qa))
            }).lunaradiodisableSelection();
            m = document.createElement("span");
            m.classList.add(c + "textradionamespan");
            a.appendChild(m);
            d("." + c + "textradionamespan").css({
                "padding-left": "10px",
                "padding-right": "10px",
                margin: "0",
                "white-space": "nowrap",
                "font-family": aa,
                color: x
            }).html(Ya);
            m = document.createElement("div");
            m.id = c + "textradioname";
            m.dataset.speed = .5;
            m.dataset.reverse = !0;
            a.appendChild(m);
            d("#" + c + "textradioname").css({
                position: "absolute",
                overflow: "hidden",
                padding: "0",
                margin: "0",
                "white-space": "nowrap",
                "text-align": "center",
                "text-overflow": "ellipsis",
                "font-family": aa,
                color: x
            }).addClass(c + "textradioname").html(d("." + c + "textradionamespan")).lunaradiodisableSelection();
            m = document.createElement("span");
            m.classList.add(c + "texttitlespan");
            a.appendChild(m);
            d("." + c + "texttitlespan").css({
                "padding-left": "10px",
                "padding-right": "10px",
                margin: "0",
                "white-space": "nowrap",
                "font-family": aa,
                color: x
            }).html("");
            m = document.createElement("div");
            m.id = c + "texttitle";
            m.dataset.speed = .9;
            a.appendChild(m);
            d("#" + c + "texttitle").css({
                position: "absolute",
                overflow: "hidden",
                padding: "0",
                margin: "0",
                "white-space": "nowrap",
                "text-align": "center",
                "text-overflow": "ellipsis",
                "font-family": aa,
                color: x
            }).addClass(c + "texttitle").html(d("." + c + "texttitlespan")).lunaradiodisableSelection();
            m = document.createElement("div");
            m.id = c + "textvolumeend";
            a.appendChild(m);
            d("#" +
                c + "textvolumeend").css({
                position: "absolute",
                "text-align": "center",
                "font-family": "Roboto",
                color: x
            }).html("100").lunaradiodisableSelection();
            xb(a);
            yb(a);
            T() ? (M = 100, ra(100)) : Ia(Za)
        }

        function Wa(b) {
            if ("true" == zb) {
                var a = "";
                "small" == ja && (a = "small");
                b && d("#" + c + a + "texttitle").hasClass(c + "Marquee") && (d("#" + c + a + "texttitle").removeClass(c + "Marquee"), d("#" + c + a + "texttitle").html(d("." + c + a + "texttitlespan").first()), d("#" + c + a + "texttitle").data("lunaradioMarquee").pause());
                d("#" + c + a + "textradioname").width() > d("." +
                    c + a + "textradionamespan").first().width() ? d("#" + c + a + "textradioname").hasClass(c + "Marquee") && (d("#" + c + a + "textradioname").removeClass(c + "Marquee"), d("#" + c + a + "textradioname").html(d("." + c + a + "textradionamespan").first()), d("#" + c + a + "textradioname").data("lunaradioMarquee").pause()) : d("#" + c + a + "textradioname").hasClass(c + "Marquee") || (d("#" + c + a + "textradioname").addClass(c + "Marquee"), d("#" + c + a + "textradioname").html(d("." + c + a + "textradionamespan").first()), d("#" + c + a + "textradioname").lunaradioMarquee());
                d("#" +
                    c + a + "texttitle").width() > d("." + c + a + "texttitlespan").first().width() ? d("#" + c + a + "texttitle").hasClass(c + "Marquee") && (d("#" + c + a + "texttitle").removeClass(c + "Marquee"), d("#" + c + a + "texttitle").html(d("." + c + a + "texttitlespan").first()), d("#" + c + a + "texttitle").data("lunaradioMarquee").pause()) : d("#" + c + a + "texttitle").hasClass(c + "Marquee") || (d("#" + c + a + "texttitle").addClass(c + "Marquee"), d("#" + c + a + "texttitle").html(d("." + c + a + "texttitlespan").first()), d("#" + c + a + "texttitle").lunaradioMarquee())
            }
        }

        function yb(b) {
            var a =
                document.createElement("div");
            a.id = c + "pauseplaywrapper";
            b.appendChild(a);
            d("#" + c + "pauseplaywrapper").css({
                position: "absolute",
                cursor: "pointer"
            }).on("click", function() {
                $a();
                R ? Ja() : Ka()
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "buttonplay";
            a.appendChild(b);
            d("#" + c + "buttonplay").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                transition: "fill 0.5s",
                fill: x
            }).html('<svg x="0px" y="0px"\t viewBox="0 0 800 800" ><path d="M713.9,400.5c1.4,171.2-137.8,314.4-313.9,314.3c-175.6,0-314.2-143-314-315c0.2-171.3,140.6-313.9,315-313.4\tC574,87,715.4,228.9,713.9,400.5z M279.5,400.3c0,23.1,0,46.2,0,69.3c0,20.8-0.2,41.7,0.1,62.5c0.1,12.2,6,21.1,17,26.6\tc11,5.5,21.2,3,31.2-2.9c23.3-13.6,46.8-27,70.2-40.5c49.8-28.6,99.6-57.1,149.3-85.8c18.1-10.4,18.7-38.7,1.1-49.4\tc-74.5-45.4-149-90.8-223.5-136.1c-6-3.7-12.6-5.5-19.8-4.2c-15.7,2.9-25.5,14.4-25.5,30.5C279.4,313.6,279.5,357,279.5,400.3z"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "buttonpause";
            a.appendChild(b);
            d("#" + c + "buttonpause").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                transition: "fill 0.5s",
                fill: x
            }).html('<svg x="0px" y="0px"\t viewBox="0 0 800 800" ><path d="M86.3,400.7C84.8,229.1,226.5,86.7,400.6,87c172.9,0.3,313.7,142.5,313.1,314.8c-0.6,170.5-138.2,313.3-314.4,313.1\tC224.3,714.7,84.9,572.1,86.3,400.7z M378.8,400.8C378.8,400.8,378.7,400.8,378.8,400.8c-0.1-32.6-0.5-65.3,0.2-97.9\tc0.3-13.7-10.3-23.4-22.7-22.8c-18.3,0.8-36.6,0.2-54.8,0.2c-13.9,0-22.1,8.1-22.1,21.9c0,65.7,0.2,131.4-0.2,197.1\tc-0.1,12.6,9.2,22.6,22.4,22.2c18.4-0.6,36.9-0.5,55.3,0c12.1,0.3,22.2-7.4,22-21.9C378.6,466.7,378.8,433.8,378.8,400.8z\t M420.9,400.8C420.9,400.8,420.9,400.8,420.9,400.8c0.1,33.1,0,66.1,0.1,99.2c0,13.8,7.7,21.4,21.5,21.4c18.8,0,37.7-0.3,56.5,0.1\tc12.3,0.3,21.6-9.6,21.5-21.4c-0.2-66.1-0.1-132.2-0.1-198.3c0-13.3-8.2-21.4-21.7-21.5c-18.6,0-37.2,0.5-55.7-0.2\tc-12-0.5-22.5,9.2-22.3,22C421.2,335,420.9,367.9,420.9,400.8z"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).fadeOut(0).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "audiopreloader";
            a.appendChild(b);
            d("#" + c + "audiopreloader").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                fill: x
            }).html('<svg x="0px" y="0px" viewBox="5 5 40 40"><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(39.9522 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg>').fadeOut(0).lunaradiodisableSelection()
        }

        function wb(b) {
            var a = document.createElement("div");
            a.id = c + "backgroundimage";
            b.appendChild(a);
            d("#" + c + "backgroundimage").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                "-webkit-filter": "blur(40px)",
                filter: "blur(40px)",
                opacity: "0.5"
            });
            var h = document.createElement("div");
            h.id = c + "backgroundimage1";
            a.appendChild(h);
            d("#" + c + "backgroundimage1").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                transition: "opacity 1s",
                opacity: "0.0",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            h = document.createElement("div");
            h.id = c + "backgroundimage2";
            a.appendChild(h);
            d("#" + c + "backgroundimage2").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                transition: "opacity 1s",
                opacity: "0.0",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            a = document.createElement("div");
            a.id = c + "coverwrapper";
            b.appendChild(a);
            d("#" + c + "coverwrapper").css({
                position: "absolute",
                overflow: "hidden",
                background: "rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.1)"
            }).on("click",
                function() {
                    "" != pa && window.open(pa)
                }).lunaradiodisableSelection();
            h = document.createElement("div");
            h.id = c + "coverwrapper1";
            a.appendChild(h);
            d("#" + c + "coverwrapper1").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                transition: "opacity 1s",
                opacity: "0.0",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            h = document.createElement("div");
            h.id = c + "coverwrapper2";
            a.appendChild(h);
            d("#" + c + "coverwrapper2").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                transition: "opacity 1s",
                opacity: "0.0",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            "circle" == Da && (d("#" + c + "coverwrapper, #" + c + "coverwrapper1, #" + c + "coverwrapper2").css({
                "border-radius": "50%"
            }), d("#" + c + "backgroundimage, #" + c + "backgroundimage1, #" + c + "backgroundimage2").css({
                "border-radius": "50%"
            }))
        }

        function xb(b) {
            var a = document.createElement("div");
            a.id = c + "volumewrapper";
            b.appendChild(a);
            d("#" + c + "volumewrapper").css({
                position: "absolute"
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "volumebackground";
            a.appendChild(b);
            d("#" + c + "volumebackground").css({
                position: "absolute",
                width: "100%",
                background: x
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "volumefill";
            a.appendChild(b);
            d("#" + c + "volumefill").css({
                position: "absolute",
                width: "0",
                background: q
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "volumeicon";
            a.appendChild(b);
            d("#" + c + "volumeicon").css({
                position: "absolute",
                top: "0px",
                "border-radius": "50%",
                background: q
            }).lunaradiodisableSelection();
            b = document.createElement("img");
            b.id = c + "volumegrab";
            a.appendChild(b);
            b.src = "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw%3D%3D";
            d("#" + c + "volumegrab").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                cursor: "pointer",
                height: "100%",
                width: "100%",
                padding: "0",
                margin: "0"
            }).mouseover(function(h) {
                d(this).css("cursor", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAALlSURBVEiJxZe9bhNBEMd/5zsSkhjs0Fi0SYG7CAmltQUpeAGeISmTB6CFSOQFkoKOwqJAQAQNCCHyIUs0KYAiEmUaQ2GshORuPyhu196c95wLSHik0a3v7P3Nf2Zudx1orRmHlcZCHSc48t0MgqDIbwPjANr4SHPL6gWPsJIDe2k+PwAUIIwXaxqt9ZB7LAC2gTfANeCtNga8A24CVeAqEDrB5bKKgrctaHNzU5fLZe2Aj42/B2omsEkTQC64SHOVgMaI54GUcjqO47vAd+AFcB2YAq7kqS8K9ppSCiAQQiCEAAi63e494DkwC0yT9tEQvAjY7V7m5+cBkFJaGEmS9MFCCDqdTgN4Rlr3aTxpLwLWwMOtrS0Ams0mjUZjCGaDcMZ3gBvADJ6UFwU/XV5ePraTKqXIgbnjgLTWFnyOVeQ91qTvJ0mSoJSi1Wr1A7AwKWVfvRlD2t0TeFI9Cmxr238vLUwphZQSKSVHR0eTLiwDDo1Sd+GBrPyMvQa6wCvSBumn0dbXNpj1w8PDSaf2Nniv5SkuAY1er1dWSt2vVCotTBqtWt/VHRvLXT7zFAfAjlXU6XSaFmwV+dw+29vbA/hGuoYrPJtIbqqjKFqvVqsf7KRLS0tTPojPV1ZWDhg0pTTwQoq1EOJzGIYbtVrtU5IkrK6uemG+e8At4BEQG5dZxXk1VkAipWwDQghBvV4nW2Nfndvttp0jBk6BMzzb5aiuFsBJFEXrc3NzH0fV1PW1tbUD4Ou/gBUQCyH2wzB8Uq/Xdy5qKifNjw30FEi4RI1d+JmUcj8Mw42FhYVdC8mrt7EY+G089oEvWjJtZ55IKXfDMAwWFxdvk9mxMvbFAE/ISTNA4DtxeA57JdJ1d4Z0n50FyqTrsJs1TarwF/AD+El6OpHwd4c9ZaLXzthu8lmwIFXcM98bSjMUV2ytZGAT5jq06zA4ccYMFpA0Kod1WTAM6juqzjYz5ya/EPw/bGx/Yf4AHxykPX4eCXQAAAAASUVORK5CYII%3D), auto")
            }).lunaradiograb({
                onstart: function(h) {
                    d(this).css("cursor",
                        "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAKmSURBVEiJ7ZbPaxNBFMc/m4lttYtNBem9F3MrgvRawR78C/wbemz/CS3Yf8OLXgQ9KAgi9gcBLz2oh0IOhfZSLdUkTZN9s+NhZtpNdrJZFeyhDgzz2GTn8977vnmzkTGGyxiVS6H+B18JcDX0MIqiMu9GbgKYoTU4sicoCC4BU8BLZz8CUkC7mToHis+pMSY3C6CvgRbwRkRMr9czwDugDbwFbgExMOmcG8kqC47iODbGGCMiJo5j0+12TafTMUDn5OTEHB8fG6DjHLntHLjGhRwDjLLFFbXb7baIICIAZOxKxo4ODg4eAC+AWeAGVs5c0ZQFK4AkSUJgRIQkSQAiEaHZbC4Bz4Cag+fSXlRcvpAq3msRIU1T9vf3ERG01hweHk552zvh7HtYzROgjy28cx2LIn4F/HBrnI3SR661Pn8mIuzt7U1lshIBN4FprNYDrFERV4ClVqsVp2n6cGZm5nk2Yq11cM3abkw6aC7VoyKOgE0f0dHR0X0P9hGFpv9te3sb4CuDTaYUmGq1ul6r1d77TZeXl6+HIKG5srKyi9VTGNJ2HNiIyCel1Mbc3NzHJElYXV0NwkLPgDvAY2xR5QoLRmucAonWugGIiFCv1xnWOKRzo9Hwe/SBM6DnIh8AF1W1AKfVanV9fn7+Q5Gm2bm2trYLfPkbcAr0RWRHKfW0Xq9vjiuqTJqfOOgZ9hynw5uP61wp0NNa7yilNhYWFrY8ZJTebvSBrpv9EHjctegr81RrvaWUihYXF+9ScEyAzw54yog0A0Sh2yjwIVDBNoNpbPOfxXazCQazZrAR/gS+Ad+xN5aGP/sQSJ33JmP7m2cYLNiIW+5/uTRD+Yj98BfGhFtzrdCBBBu5byDWqwzrd8FwoW+Rzj4zA5uPBf+LcfW+q38BmqVkrsNuDnIAAAAASUVORK5CYII%3D), auto");
                    ba = M
                },
                onmove: function(h) {
                    h = 100 * h.offset.x / d("#" + c + "volumewrapper").width();
                    M = 100 > ba + h ? ba + h : 100;
                    0 > ba + h && (M = 0);
                    ra(M)
                },
                onfinish: function(h) {
                    d(this).css("cursor", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAALlSURBVEiJxZe9bhNBEMd/5zsSkhjs0Fi0SYG7CAmltQUpeAGeISmTB6CFSOQFkoKOwqJAQAQNCCHyIUs0KYAiEmUaQ2GshORuPyhu196c95wLSHik0a3v7P3Nf2Zudx1orRmHlcZCHSc48t0MgqDIbwPjANr4SHPL6gWPsJIDe2k+PwAUIIwXaxqt9ZB7LAC2gTfANeCtNga8A24CVeAqEDrB5bKKgrctaHNzU5fLZe2Aj42/B2omsEkTQC64SHOVgMaI54GUcjqO47vAd+AFcB2YAq7kqS8K9ppSCiAQQiCEAAi63e494DkwC0yT9tEQvAjY7V7m5+cBkFJaGEmS9MFCCDqdTgN4Rlr3aTxpLwLWwMOtrS0Ams0mjUZjCGaDcMZ3gBvADJ6UFwU/XV5ePraTKqXIgbnjgLTWFnyOVeQ91qTvJ0mSoJSi1Wr1A7AwKWVfvRlD2t0TeFI9Cmxr238vLUwphZQSKSVHR0eTLiwDDo1Sd+GBrPyMvQa6wCvSBumn0dbXNpj1w8PDSaf2Nniv5SkuAY1er1dWSt2vVCotTBqtWt/VHRvLXT7zFAfAjlXU6XSaFmwV+dw+29vbA/hGuoYrPJtIbqqjKFqvVqsf7KRLS0tTPojPV1ZWDhg0pTTwQoq1EOJzGIYbtVrtU5IkrK6uemG+e8At4BEQG5dZxXk1VkAipWwDQghBvV4nW2Nfndvttp0jBk6BMzzb5aiuFsBJFEXrc3NzH0fV1PW1tbUD4Ou/gBUQCyH2wzB8Uq/Xdy5qKifNjw30FEi4RI1d+JmUcj8Mw42FhYVdC8mrt7EY+G089oEvWjJtZ55IKXfDMAwWFxdvk9mxMvbFAE/ISTNA4DtxeA57JdJ1d4Z0n50FyqTrsJs1TarwF/AD+El6OpHwd4c9ZaLXzthu8lmwIFXcM98bSjMUV2ytZGAT5jq06zA4ccYMFpA0Kod1WTAM6juqzjYz5ya/EPw/bGx/Yf4AHxykPX4eCXQAAAAASUVORK5CYII%3D), auto")
                }
            })
        }

        function ob(b) {
            E("iniSmallPlayer");
            var a = document.createElement("div");
            a.id = c + "smallplayerwrapper";
            b.appendChild(a);
            d("#" + c + "smallplayerwrapper").css({
                overflow: "hidden",
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%"
            });
            b = document.createElement("div");
            b.id = c + "smallvolumebackground";
            a.appendChild(b);
            d("#" + c + "smallvolumebackground").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                background: "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)"
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smalliconlive";
            a.appendChild(b);
            d("#" + c + "smalliconlive").css({
                position: "absolute",
                fill: "rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.3)"
            }).html('<svg x="0px" y="0px" viewBox="-16 0 512 512.00113" ><path d="m262.84375 140.558594c-12.699219 12.671875-33.28125 12.671875-45.980469 0-12.695312-12.671875-12.695312-33.21875 0-45.890625 12.699219-12.671875 33.28125-12.671875 45.980469 0 12.695312 12.671875 12.695312 33.21875 0 45.890625zm0 0"/><path d="m307.257812 189.726562c-3.960937 0-7.921874-1.511718-10.9375-4.539062-6.03125-6.039062-6.019531-15.824219.019532-21.851562 12.238281-12.214844 18.976562-28.453126 18.976562-45.722657s-6.738281-33.507812-18.976562-45.722656c-6.039063-6.03125-6.050782-15.8125-.019532-21.855469 6.027344-6.039062 15.8125-6.050781 21.851563-.019531 18.089844 18.054687 28.050781 42.058594 28.050781 67.597656 0 25.535157-9.960937 49.542969-28.050781 67.597657-3.015625 3.011718-6.964844 4.515624-10.914063 4.515624zm0 0"/><path d="m342.210938 235.222656c-3.960938 0-7.921876-1.511718-10.9375-4.535156-6.03125-6.042969-6.019532-15.824219.019531-21.855469 24.414062-24.367187 37.863281-56.761719 37.863281-91.21875s-13.449219-66.851562-37.863281-91.21875c-6.039063-6.03125-6.050781-15.8125-.019531-21.855469 6.03125-6.039062 15.8125-6.050781 21.851562-.019531 30.265625 30.207031 46.9375 70.371094 46.933594 113.09375 0 42.722657-16.667969 82.890625-46.933594 113.097657-3.015625 3.007812-6.964844 4.511718-10.914062 4.511718zm0 0"/><path d="m172.371094 189.726562c-3.949219 0-7.898438-1.503906-10.917969-4.515624-18.089844-18.054688-28.050781-42.0625-28.050781-67.597657 0-25.539062 9.960937-49.542969 28.050781-67.597656 6.039063-6.03125 15.824219-6.023437 21.851563.019531 6.03125 6.039063 6.019531 15.824219-.019532 21.855469-12.238281 12.214844-18.976562 28.453125-18.976562 45.722656s6.738281 33.507813 18.976562 45.722657c6.039063 6.027343 6.050782 15.8125.019532 21.851562-3.015626 3.023438-6.976563 4.539062-10.933594 4.539062zm0 0"/><path d="m137.417969 235.222656c-3.953125 0-7.902344-1.503906-10.917969-4.515625-30.265625-30.207031-46.933594-70.371093-46.933594-113.09375 0-42.726562 16.667969-82.890625 46.933594-113.097656 6.039062-6.027344 15.824219-6.019531 21.851562.023437 6.03125 6.039063 6.019532 15.820313-.019531 21.851563-24.414062 24.367187-37.863281 56.761719-37.863281 91.21875s13.449219 66.855469 37.863281 91.222656c6.039063 6.03125 6.050781 15.8125.019531 21.855469-3.015624 3.023438-6.976562 4.535156-10.933593 4.535156zm0 0"/><path d="m443.480469 261.9375h-407.332031c-19.964844 0-36.148438 16.183594-36.148438 36.144531v177.769531c0 19.964844 16.183594 36.148438 36.148438 36.148438h407.328124c19.964844 0 36.148438-16.183594 36.148438-36.148438v-177.769531c0-19.960937-16.183594-36.144531-36.144531-36.144531zm-324.609375 203.683594h-56.933594c-8.53125 0-15.449219-6.917969-15.449219-15.453125v-126.398438c0-8.53125 6.917969-15.453125 15.449219-15.453125 8.535156 0 15.453125 6.917969 15.453125 15.453125v110.945313h41.480469c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.535156-6.917969 15.453125-15.453125 15.453125zm63.328125-15.453125c0 8.535156-6.917969 15.453125-15.453125 15.453125s-15.453125-6.917969-15.453125-15.453125v-126.398438c0-8.53125 6.917969-15.453125 15.453125-15.453125s15.453125 6.917969 15.453125 15.453125zm130.015625-121.929688-38.160156 126.394531c-.003907.011719-.007813.023438-.011719.035157-4.144531 14.144531-25.273438 13.796875-29.5625 0-.003907-.011719-.007813-.023438-.011719-.035157l-38.160156-126.394531c-2.464844-8.171875 2.15625-16.792969 10.328125-19.261719 8.164062-2.464843 16.792969 2.15625 19.257812 10.328126l23.367188 77.394531 23.367187-77.394531c2.46875-8.171876 11.089844-12.796876 19.261719-10.328126 8.167969 2.46875 12.792969 11.089844 10.324219 19.261719zm95.066406 35.320313c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.53125-6.917969 15.453125-15.453125 15.453125h-43.851562v40.25h52.175781c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.535156-6.917969 15.453125-15.453125 15.453125h-67.628907c-8.535156 0-15.453124-6.917969-15.453124-15.453125v-126.398438c0-8.53125 6.917968-15.453125 15.453124-15.453125h69.710938c8.53125 0 15.453125 6.917969 15.453125 15.453125 0 8.535157-6.921875 15.453125-15.453125 15.453125h-54.261719v24.335938zm0 0"/></svg>').lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smalltextvolume";
            a.appendChild(b);
            d("#" + c + "smalltextvolume").css({
                position: "absolute",
                "text-align": "right",
                "font-family": "Roboto",
                color: "rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.3)"
            }).html("100").lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smalliconvolume";
            a.appendChild(b);
            d("#" + c + "smalliconvolume").css({
                position: "absolute",
                fill: "rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.3)"
            }).html('<svg x="0px" y="0px" viewBox="0 0 800 800"><path d="M359.2,397.1c0,71.7,0,143.3,0,215c0,9.1-1.2,17.7-7.7,24.8c-13.8,14.9-34.2,15.1-49.1,0.3c-32.2-32.1-64.3-64.3-96.4-96.4\tc-4.8-4.8-9.8-9.6-14.5-14.6c-2.6-2.8-5.3-3.9-9.1-3.9c-42.4,0.1-84.8,0.1-127.1,0.1c-15.4,0-27.1-8.9-31.2-23.6\tc-1.1-4.1-1.4-8.3-1.4-12.5c0-60,0-120,0-180c0-14.4,4.6-26.3,18.5-32.9c5.1-2.4,10.6-3.1,16.1-3.1c41.5,0,83,0,124.5,0.1\tc4.2,0,7.1-1.2,9.9-4.1c36.8-36.9,73.6-73.8,110.6-110.6c10.5-10.5,23.1-14.1,37.2-8.3c11.2,4.6,17.9,13.1,19.1,25.5\tc0.5,5.1,0.6,10.2,0.6,15.3C359.2,257.5,359.2,327.3,359.2,397.1z"/><path d="M777.4,394.2c-0.2,41.1-5.6,79-17.7,115.8c-14.5,44.1-36,84.5-65.7,120.4c-9.1,11-18.2,22-28.8,31.6\tc-18.1,16.5-36.4,32.7-57.7,44.9c-19.1,10.9-43.9-1.6-46.9-23.4c-2-14.2,3.3-25.2,14.9-32.9c20.8-13.9,39.6-30.1,56.6-48.4\tc14.9-16,27.8-33.6,38.9-52.5c18.2-31,30.2-64.2,36.7-99.4c3.8-20.4,5.4-41,4.8-61.7c-1.2-42.3-10.6-82.8-28.5-121.1\tc-11.2-23.9-25.5-46-42.4-66.4c-19.8-23.8-43.3-43.3-68.4-61.2c-12.4-8.9-16.3-23.7-10.8-38.1c5.1-13.3,17.6-20.8,32.5-19.9\tc6.1,0.4,11.3,2.4,16.3,5.6c21.2,13.8,40.9,29.5,58.5,47.5c34.5,35.1,61.6,75.3,80.2,121.1c13.4,33,22,67.1,25.4,102.5\tC776.7,371.4,776.9,384.1,777.4,394.2z"/><path d="M652.1,392.3c-0.7,56.6-15.7,104.9-47.2,147.9c-17.4,23.7-38.4,43.6-63.2,59.5c-14.3,9.1-29.1,8.5-41-2\tc-11.9-10.5-13.8-29.9-4.5-42.9c3.9-5.5,9.5-8.9,14.8-12.6c35.3-24.8,59.1-57.9,70.4-99.4c10.8-39.8,8-78.9-8.4-116.9\tc-9.9-22.8-24-42.5-41.9-59.5c-8.8-8.4-18.8-15.1-28.6-22.1c-11-7.9-15.3-24.6-9.9-37.3c6.2-14.7,19.2-22,34-20.1\tc11.1,1.5,19.2,8.3,27.5,14.4c10.7,7.8,20.8,16.3,29.9,26.1c19.7,21.3,36.2,44.6,47.8,71.4c9.2,21.3,15.2,43.4,18.3,66.3\tC651.3,375.2,651.6,385.5,652.1,392.3z"/><path d="M526.4,394.8c-0.1,30.3-9.9,54.9-27.8,76.5c-9,10.8-19.7,19.4-32.1,25.8c-21.2,11-44.2-0.7-47.6-24.3\tc-1.7-12.2,3.1-22.4,13.1-29.5c7.1-5.1,14.6-9.7,19.8-16.9c17.6-24.1,12-55.7-12.8-72.4c-3.4-2.3-7-4.3-9.9-7.1\tc-12.5-11.6-14.1-29.7-4.1-43.1c10-13.3,28-16.9,42.6-8.2c31.6,18.7,51,46.1,57.3,82.4C526.1,384.3,526.7,390.6,526.4,394.8z"/></svg>').lunaradiodisableSelection();
            b = document.createElement("span");
            b.classList.add(c + "smalltextradionamespan");
            a.appendChild(b);
            d("." + c + "smalltextradionamespan").css({
                "padding-right": "30px",
                margin: "0",
                "white-space": "nowrap",
                "font-family": aa,
                color: x
            }).html(Ya);
            b = document.createElement("div");
            b.id = c + "smalltextradioname";
            b.dataset.speed = .5;
            b.dataset.reverse = !0;
            a.appendChild(b);
            d("#" + c + "smalltextradioname").css({
                position: "absolute",
                overflow: "hidden",
                padding: "0 0 10px 0",
                "white-space": "nowrap",
                "text-align": "left",
                "text-overflow": "ellipsis",
                "font-family": aa,
                color: x
            }).addClass(c + "smalltextradioname").html(d("." + c + "smalltextradionamespan")).lunaradiodisableSelection();
            b = document.createElement("span");
            b.classList.add(c + "smalltexttitlespan");
            a.appendChild(b);
            d("." + c + "smalltexttitlespan").css({
                "padding-right": "30px",
                margin: "0",
                "white-space": "nowrap",
                "font-family": aa,
                color: x
            }).html("");
            b = document.createElement("div");
            b.id = c + "smalltexttitle";
            b.dataset.speed = .7;
            a.appendChild(b);
            d("#" + c + "smalltexttitle").css({
                position: "absolute",
                overflow: "hidden",
                padding: "0 0 10px 0",
                "white-space": "nowrap",
                "text-align": "left",
                "text-overflow": "ellipsis",
                "font-family": aa,
                color: x
            }).addClass(c + "smalltexttitle").html(d("." + c + "smalltexttitlespan")).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smallvolumegrab";
            a.appendChild(b);
            d("#" + c + "smallvolumegrab").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                cursor: "pointer",
                height: "100%",
                width: "100%",
                padding: "0",
                margin: "0"
            }).mouseover(function(h) {
                d(this).css("cursor", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAALlSURBVEiJxZe9bhNBEMd/5zsSkhjs0Fi0SYG7CAmltQUpeAGeISmTB6CFSOQFkoKOwqJAQAQNCCHyIUs0KYAiEmUaQ2GshORuPyhu196c95wLSHik0a3v7P3Nf2Zudx1orRmHlcZCHSc48t0MgqDIbwPjANr4SHPL6gWPsJIDe2k+PwAUIIwXaxqt9ZB7LAC2gTfANeCtNga8A24CVeAqEDrB5bKKgrctaHNzU5fLZe2Aj42/B2omsEkTQC64SHOVgMaI54GUcjqO47vAd+AFcB2YAq7kqS8K9ppSCiAQQiCEAAi63e494DkwC0yT9tEQvAjY7V7m5+cBkFJaGEmS9MFCCDqdTgN4Rlr3aTxpLwLWwMOtrS0Ams0mjUZjCGaDcMZ3gBvADJ6UFwU/XV5ePraTKqXIgbnjgLTWFnyOVeQ91qTvJ0mSoJSi1Wr1A7AwKWVfvRlD2t0TeFI9Cmxr238vLUwphZQSKSVHR0eTLiwDDo1Sd+GBrPyMvQa6wCvSBumn0dbXNpj1w8PDSaf2Nniv5SkuAY1er1dWSt2vVCotTBqtWt/VHRvLXT7zFAfAjlXU6XSaFmwV+dw+29vbA/hGuoYrPJtIbqqjKFqvVqsf7KRLS0tTPojPV1ZWDhg0pTTwQoq1EOJzGIYbtVrtU5IkrK6uemG+e8At4BEQG5dZxXk1VkAipWwDQghBvV4nW2Nfndvttp0jBk6BMzzb5aiuFsBJFEXrc3NzH0fV1PW1tbUD4Ou/gBUQCyH2wzB8Uq/Xdy5qKifNjw30FEi4RI1d+JmUcj8Mw42FhYVdC8mrt7EY+G089oEvWjJtZ55IKXfDMAwWFxdvk9mxMvbFAE/ISTNA4DtxeA57JdJ1d4Z0n50FyqTrsJs1TarwF/AD+El6OpHwd4c9ZaLXzthu8lmwIFXcM98bSjMUV2ytZGAT5jq06zA4ccYMFpA0Kod1WTAM6juqzjYz5ya/EPw/bGx/Yf4AHxykPX4eCXQAAAAASUVORK5CYII%3D), auto")
            }).lunaradiograb({
                onstart: function(h) {
                    d(this).css("cursor",
                        "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAKmSURBVEiJ7ZbPaxNBFMc/m4lttYtNBem9F3MrgvRawR78C/wbemz/CS3Yf8OLXgQ9KAgi9gcBLz2oh0IOhfZSLdUkTZN9s+NhZtpNdrJZFeyhDgzz2GTn8977vnmzkTGGyxiVS6H+B18JcDX0MIqiMu9GbgKYoTU4sicoCC4BU8BLZz8CUkC7mToHis+pMSY3C6CvgRbwRkRMr9czwDugDbwFbgExMOmcG8kqC47iODbGGCMiJo5j0+12TafTMUDn5OTEHB8fG6DjHLntHLjGhRwDjLLFFbXb7baIICIAZOxKxo4ODg4eAC+AWeAGVs5c0ZQFK4AkSUJgRIQkSQAiEaHZbC4Bz4Cag+fSXlRcvpAq3msRIU1T9vf3ERG01hweHk552zvh7HtYzROgjy28cx2LIn4F/HBrnI3SR661Pn8mIuzt7U1lshIBN4FprNYDrFERV4ClVqsVp2n6cGZm5nk2Yq11cM3abkw6aC7VoyKOgE0f0dHR0X0P9hGFpv9te3sb4CuDTaYUmGq1ul6r1d77TZeXl6+HIKG5srKyi9VTGNJ2HNiIyCel1Mbc3NzHJElYXV0NwkLPgDvAY2xR5QoLRmucAonWugGIiFCv1xnWOKRzo9Hwe/SBM6DnIh8AF1W1AKfVanV9fn7+Q5Gm2bm2trYLfPkbcAr0RWRHKfW0Xq9vjiuqTJqfOOgZ9hynw5uP61wp0NNa7yilNhYWFrY8ZJTebvSBrpv9EHjctegr81RrvaWUihYXF+9ScEyAzw54yog0A0Sh2yjwIVDBNoNpbPOfxXazCQazZrAR/gS+Ad+xN5aGP/sQSJ33JmP7m2cYLNiIW+5/uTRD+Yj98BfGhFtzrdCBBBu5byDWqwzrd8FwoW+Rzj4zA5uPBf+LcfW+q38BmqVkrsNuDnIAAAAASUVORK5CYII%3D), auto");
                    ba = M
                },
                onmove: function(h) {
                    h = 100 * h.offset.x / d("#" + c + "smallvolumegrab").width();
                    M = 100 > ba + h ? ba + h : 100;
                    0 > ba + h && (M = 0);
                    Ea(M)
                },
                onfinish: function(h) {
                    d(this).css("cursor", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAALlSURBVEiJxZe9bhNBEMd/5zsSkhjs0Fi0SYG7CAmltQUpeAGeISmTB6CFSOQFkoKOwqJAQAQNCCHyIUs0KYAiEmUaQ2GshORuPyhu196c95wLSHik0a3v7P3Nf2Zudx1orRmHlcZCHSc48t0MgqDIbwPjANr4SHPL6gWPsJIDe2k+PwAUIIwXaxqt9ZB7LAC2gTfANeCtNga8A24CVeAqEDrB5bKKgrctaHNzU5fLZe2Aj42/B2omsEkTQC64SHOVgMaI54GUcjqO47vAd+AFcB2YAq7kqS8K9ppSCiAQQiCEAAi63e494DkwC0yT9tEQvAjY7V7m5+cBkFJaGEmS9MFCCDqdTgN4Rlr3aTxpLwLWwMOtrS0Ams0mjUZjCGaDcMZ3gBvADJ6UFwU/XV5ePraTKqXIgbnjgLTWFnyOVeQ91qTvJ0mSoJSi1Wr1A7AwKWVfvRlD2t0TeFI9Cmxr238vLUwphZQSKSVHR0eTLiwDDo1Sd+GBrPyMvQa6wCvSBumn0dbXNpj1w8PDSaf2Nniv5SkuAY1er1dWSt2vVCotTBqtWt/VHRvLXT7zFAfAjlXU6XSaFmwV+dw+29vbA/hGuoYrPJtIbqqjKFqvVqsf7KRLS0tTPojPV1ZWDhg0pTTwQoq1EOJzGIYbtVrtU5IkrK6uemG+e8At4BEQG5dZxXk1VkAipWwDQghBvV4nW2Nfndvttp0jBk6BMzzb5aiuFsBJFEXrc3NzH0fV1PW1tbUD4Ou/gBUQCyH2wzB8Uq/Xdy5qKifNjw30FEi4RI1d+JmUcj8Mw42FhYVdC8mrt7EY+G089oEvWjJtZ55IKXfDMAwWFxdvk9mxMvbFAE/ISTNA4DtxeA57JdJ1d4Z0n50FyqTrsJs1TarwF/AD+El6OpHwd4c9ZaLXzthu8lmwIFXcM98bSjMUV2ytZGAT5jq06zA4ccYMFpA0Kod1WTAM6juqzjYz5ya/EPw/bGx/Yf4AHxykPX4eCXQAAAAASUVORK5CYII%3D), auto")
                }
            }).lunaradiodisableSelection();
            Ab(a);
            Bb(a);
            T() ? (M = 100, ra(100)) : Cb(Za)
        }

        function Bb(b) {
            var a = document.createElement("div");
            a.id = c + "smallcoverwrapper";
            b.appendChild(a);
            d("#" + c + "smallcoverwrapper").css({
                position: "absolute",
                overflow: "hidden",
                background: "rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.1)"
            }).on("click", function() {
                "" != pa && window.open(pa)
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smallcoverwrapper1";
            a.appendChild(b);
            d("#" + c + "smallcoverwrapper1").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                transition: "opacity 1s",
                overflow: "hidden",
                opacity: "0.0",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            b = document.createElement("div");
            b.id = c + "smallcoverwrapper2";
            a.appendChild(b);
            d("#" + c + "smallcoverwrapper2").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                transition: "opacity 1s",
                opacity: "0.0",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            "circle" == Da && d("#" + c + "smallcoverwrapper, #" + c + "smallcoverwrapper1, #" + c + "smallcoverwrapper2").css({
                "border-radius": "50%"
            })
        }

        function Ab(b) {
            var a = document.createElement("div");
            a.id = c + "smallpauseplaywrapper";
            b.appendChild(a);
            d("#" + c + "smallpauseplaywrapper").css({
                position: "absolute",
                cursor: "pointer"
            }).on("click", function() {
                $a();
                R ? Ja() : Ka()
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smallbuttonplay";
            a.appendChild(b);
            d("#" + c + "smallbuttonplay").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                transition: "fill 0.5s",
                fill: x
            }).html('<svg x="0px" y="0px"\t viewBox="0 0 800 800" ><path d="M713.9,400.5c1.4,171.2-137.8,314.4-313.9,314.3c-175.6,0-314.2-143-314-315c0.2-171.3,140.6-313.9,315-313.4\tC574,87,715.4,228.9,713.9,400.5z M279.5,400.3c0,23.1,0,46.2,0,69.3c0,20.8-0.2,41.7,0.1,62.5c0.1,12.2,6,21.1,17,26.6\tc11,5.5,21.2,3,31.2-2.9c23.3-13.6,46.8-27,70.2-40.5c49.8-28.6,99.6-57.1,149.3-85.8c18.1-10.4,18.7-38.7,1.1-49.4\tc-74.5-45.4-149-90.8-223.5-136.1c-6-3.7-12.6-5.5-19.8-4.2c-15.7,2.9-25.5,14.4-25.5,30.5C279.4,313.6,279.5,357,279.5,400.3z"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smallbuttonpause";
            a.appendChild(b);
            d("#" + c + "smallbuttonpause").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                transition: "fill 0.5s",
                fill: x
            }).html('<svg x="0px" y="0px"\t viewBox="0 0 800 800" ><path d="M86.3,400.7C84.8,229.1,226.5,86.7,400.6,87c172.9,0.3,313.7,142.5,313.1,314.8c-0.6,170.5-138.2,313.3-314.4,313.1\tC224.3,714.7,84.9,572.1,86.3,400.7z M378.8,400.8C378.8,400.8,378.7,400.8,378.8,400.8c-0.1-32.6-0.5-65.3,0.2-97.9\tc0.3-13.7-10.3-23.4-22.7-22.8c-18.3,0.8-36.6,0.2-54.8,0.2c-13.9,0-22.1,8.1-22.1,21.9c0,65.7,0.2,131.4-0.2,197.1\tc-0.1,12.6,9.2,22.6,22.4,22.2c18.4-0.6,36.9-0.5,55.3,0c12.1,0.3,22.2-7.4,22-21.9C378.6,466.7,378.8,433.8,378.8,400.8z\t M420.9,400.8C420.9,400.8,420.9,400.8,420.9,400.8c0.1,33.1,0,66.1,0.1,99.2c0,13.8,7.7,21.4,21.5,21.4c18.8,0,37.7-0.3,56.5,0.1\tc12.3,0.3,21.6-9.6,21.5-21.4c-0.2-66.1-0.1-132.2-0.1-198.3c0-13.3-8.2-21.4-21.7-21.5c-18.6,0-37.2,0.5-55.7-0.2\tc-12-0.5-22.5,9.2-22.3,22C421.2,335,420.9,367.9,420.9,400.8z"/></svg>').on("mouseenter",
                function() {
                    d(this).css("fill", q)
                }).on("mouseleave", function() {
                d(this).css("fill", x)
            }).fadeOut(0).lunaradiodisableSelection();
            b = document.createElement("div");
            b.id = c + "smallaudiopreloader";
            a.appendChild(b);
            d("#" + c + "smallaudiopreloader").css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                fill: x
            }).html('<svg x="0px" y="0px" viewBox="5 5 40 40"><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(39.9522 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg>').fadeOut(0).lunaradiodisableSelection()
        }

        function ra(b) {
            0 > b && (b = 0);
            100 < b && (b = 100);
            T() || (B.volume = b / 100);
            var a = d("#" + c + "volumewrapper").width() * b / 100;
            d("#" + c + "volumefill").css({
                width: a + "px"
            });
            d("#" + c + "volumeicon").css({
                left: a - d("#" + c + "volumeicon").width() / 2 + "px"
            });
            d("#" + c + "textvolumeend").html(Math.round(b) + "%")
        }

        function Ea(b) {
            0 > b && (b = 0);
            100 < b && (b = 100);
            0 == Math.round(b) ? d("#" + c + "smalliconvolume").html('<svg x="0px" y="0px"\t viewBox="0 0 800 800" ><path d="M401.2,400c0,72.2,0,144.4,0,216.5c0,12-3.1,22.6-13.3,29.9c-13.4,9.6-31.1,8-42.8-3.7c-36.7-36.6-73.4-73.3-109.9-110.1\tc-4.5-4.6-9-6.3-15.3-6.2c-41.3,0.3-82.7,0.2-124,0.1c-15.7,0-27-8.6-31-23.8c-1.1-4-1.4-8.4-1.4-12.6c-0.1-60.2-0.1-120.4,0-180.6\tc0-11.1,2.3-21.5,11.7-28.9c6.5-5.1,13.8-7.3,22-7.3c41.6,0,83.3-0.1,124.9,0.1c4.7,0,8.1-1.2,11.5-4.7\tc37-37.2,74.1-74.3,111.2-111.3c16.1-16,41.4-12.8,52.5,6.9c3.5,6.1,3.9,13.1,3.9,20c0,69.5,0,139.1,0,208.6\tC401.2,395.3,401.2,397.7,401.2,400z"/><path d="M685.2,526.5c-7.3,0.4-12.8-2.6-17.5-7.4c-18-18-36-35.9-53.9-54c-3.1-3.1-4.6-2.8-7.5,0.1c-17.5,17.8-35.3,35.4-52.9,53.1\tc-5.2,5.2-11.2,8.5-19,8.3c-7-0.2-12.3-3.3-17-7.9c-8.9-8.7-17.6-17.5-26.4-26.3c-10.3-10.5-10.3-24.6,0.2-35.1\tc17.8-17.9,35.7-35.8,53.7-53.6c3-3,2.9-4.6,0-7.6c-17.7-17.4-35.2-35.1-52.8-52.6c-11-11-12.2-22.8-2-34.5\tc9.3-10.6,19.1-20.9,30.2-29.8c10.9-8.7,23.1-7.6,33,2.3c17.8,17.7,35.6,35.5,53.3,53.4c2.8,2.8,4.3,3,7.2,0.1\tc17.6-17.9,35.4-35.6,53.2-53.4c8.8-8.8,19.4-10.5,29.5-5c1.7,0.9,3.1,2.2,4.4,3.5c9.4,9.4,18.8,18.8,28.2,28.2\tc10,10,10.1,24.1,0,34.2c-17.8,17.9-35.7,35.8-53.7,53.6c-2.9,2.9-3.2,4.5-0.1,7.6c17.7,17.4,35.2,35.1,52.8,52.6\tc6.3,6.3,9.6,13.7,8.1,22.9c-0.9,5.6-3.9,10-7.7,13.9c-8.5,8.7-17,17.3-25.7,25.7C697.8,523.6,692.1,527,685.2,526.5z"/></svg>') :
                d("#" + c + "smalliconvolume").html('<svg x="0px" y="0px" viewBox="0 0 800 800"><path d="M359.2,397.1c0,71.7,0,143.3,0,215c0,9.1-1.2,17.7-7.7,24.8c-13.8,14.9-34.2,15.1-49.1,0.3c-32.2-32.1-64.3-64.3-96.4-96.4\tc-4.8-4.8-9.8-9.6-14.5-14.6c-2.6-2.8-5.3-3.9-9.1-3.9c-42.4,0.1-84.8,0.1-127.1,0.1c-15.4,0-27.1-8.9-31.2-23.6\tc-1.1-4.1-1.4-8.3-1.4-12.5c0-60,0-120,0-180c0-14.4,4.6-26.3,18.5-32.9c5.1-2.4,10.6-3.1,16.1-3.1c41.5,0,83,0,124.5,0.1\tc4.2,0,7.1-1.2,9.9-4.1c36.8-36.9,73.6-73.8,110.6-110.6c10.5-10.5,23.1-14.1,37.2-8.3c11.2,4.6,17.9,13.1,19.1,25.5\tc0.5,5.1,0.6,10.2,0.6,15.3C359.2,257.5,359.2,327.3,359.2,397.1z"/><path d="M777.4,394.2c-0.2,41.1-5.6,79-17.7,115.8c-14.5,44.1-36,84.5-65.7,120.4c-9.1,11-18.2,22-28.8,31.6\tc-18.1,16.5-36.4,32.7-57.7,44.9c-19.1,10.9-43.9-1.6-46.9-23.4c-2-14.2,3.3-25.2,14.9-32.9c20.8-13.9,39.6-30.1,56.6-48.4\tc14.9-16,27.8-33.6,38.9-52.5c18.2-31,30.2-64.2,36.7-99.4c3.8-20.4,5.4-41,4.8-61.7c-1.2-42.3-10.6-82.8-28.5-121.1\tc-11.2-23.9-25.5-46-42.4-66.4c-19.8-23.8-43.3-43.3-68.4-61.2c-12.4-8.9-16.3-23.7-10.8-38.1c5.1-13.3,17.6-20.8,32.5-19.9\tc6.1,0.4,11.3,2.4,16.3,5.6c21.2,13.8,40.9,29.5,58.5,47.5c34.5,35.1,61.6,75.3,80.2,121.1c13.4,33,22,67.1,25.4,102.5\tC776.7,371.4,776.9,384.1,777.4,394.2z"/><path d="M652.1,392.3c-0.7,56.6-15.7,104.9-47.2,147.9c-17.4,23.7-38.4,43.6-63.2,59.5c-14.3,9.1-29.1,8.5-41-2\tc-11.9-10.5-13.8-29.9-4.5-42.9c3.9-5.5,9.5-8.9,14.8-12.6c35.3-24.8,59.1-57.9,70.4-99.4c10.8-39.8,8-78.9-8.4-116.9\tc-9.9-22.8-24-42.5-41.9-59.5c-8.8-8.4-18.8-15.1-28.6-22.1c-11-7.9-15.3-24.6-9.9-37.3c6.2-14.7,19.2-22,34-20.1\tc11.1,1.5,19.2,8.3,27.5,14.4c10.7,7.8,20.8,16.3,29.9,26.1c19.7,21.3,36.2,44.6,47.8,71.4c9.2,21.3,15.2,43.4,18.3,66.3\tC651.3,375.2,651.6,385.5,652.1,392.3z"/><path d="M526.4,394.8c-0.1,30.3-9.9,54.9-27.8,76.5c-9,10.8-19.7,19.4-32.1,25.8c-21.2,11-44.2-0.7-47.6-24.3\tc-1.7-12.2,3.1-22.4,13.1-29.5c7.1-5.1,14.6-9.7,19.8-16.9c17.6-24.1,12-55.7-12.8-72.4c-3.4-2.3-7-4.3-9.9-7.1\tc-12.5-11.6-14.1-29.7-4.1-43.1c10-13.3,28-16.9,42.6-8.2c31.6,18.7,51,46.1,57.3,82.4C526.1,384.3,526.7,390.6,526.4,394.8z"/></svg>');
            T() || (B.volume = b / 100);
            d("#" + c + "smalltextvolume").html(Math.round(b) + "%");
            b = d("#" + c + "smallvolumegrab").width() * b / 100;
            d("#" + c + "smallvolumebackground").css({
                width: b + "px"
            });
            l.width = b;
            l.height = u
        }

        function ab() {
            C = d("#" + c).width();
            u = d("#" + c).height();
            bb && (u = 80, 959 > C && (u = 60), 599 > C && (u = 40), d("#" + c).css({
                height: u + "px"
            }))
        }

        function Ua() {
            ab();
            if ("big" == ja) {
                l.width = C;
                l.height = u;
                var b = 1 * u / 100,
                    a = u / 2 - 20 - b - 4 * b;
                d("#" + c + "coverwrapper").css({
                    top: u / 4 - a / 2 - b + "px",
                    left: C / 2 - a / 2 - 2 * b + "px",
                    width: a + "px",
                    height: a + "px",
                    border: "solid " +
                        2 * b + "px rgba(" + n(x).r + ", " + n(x).g + ", " + n(x).b + ", 0.2)"
                });
                d("#" + c + "backgroundimage").css({
                    "-webkit-filter": "blur(" + 5 * b + "px)",
                    filter: "blur(" + 5 * b + "px)",
                    top: 14 * b + "px",
                    left: C / 2 - a / 1.25 + "px",
                    width: 1.5 * a + "px",
                    height: 1.5 * a + "px"
                });
                a = u / 8;
                var h = a / 2,
                    f = a * cb,
                    k = a - f,
                    v = u / 2 + b,
                    A = v + f + b,
                    L = A + k + 2 * b,
                    I = L + h,
                    ca = (u - (L + h)) / 2 + L + h - a / 1.25,
                    da = ca + a / 1.25 - h / 2;
                d("#" + c + "textradioname").css({
                    top: v + "px",
                    left: "20px",
                    width: C - 40 + "px",
                    height: f + 2 * b + "px",
                    "font-size": f + "px",
                    "line-height": f + 2 * b + "px"
                });
                d("#" + c + "texttitle").css({
                    top: A + "px",
                    left: "20px",
                    width: C - 40 + "px",
                    height: k + 2 * b + "px",
                    "font-size": k + "px",
                    "line-height": k + 2 * b + "px"
                });
                d("#" + c + "volumewrapper").css({
                    top: L + "px",
                    left: "40px",
                    width: C - 80 + "px",
                    height: h + "px"
                });
                d("#" + c + "volumebackground, #" + c + "volumefill").css({
                    height: h / 4 / 2 + "px",
                    top: h / 2 - h / 4 / 2 + "px",
                    "border-radius": h / 2 / 2 + "px"
                });
                d("#" + c + "volumeicon").css({
                    top: h / 6 + "px",
                    height: h / 2 + "px",
                    width: h / 2 + "px"
                });
                d("#" + c + "buttonvolumeoff").css({
                    top: I + "px",
                    left: "40px",
                    width: h + "px",
                    height: h + "px"
                });
                d("#" + c + "buttonvolumeon").css({
                    top: I + "px",
                    right: "40px",
                    width: h +
                        "px",
                    height: h + "px"
                });
                d("#" + c + "textvolumeend").css({
                    top: I + "px",
                    right: h + 40 + "px",
                    width: 2 * h + "px",
                    height: h + "px",
                    "font-size": h / 2 + "px",
                    "line-height": h + "px"
                });
                d("#" + c + "pauseplaywrapper").css({
                    top: ca + "px",
                    left: C / 2 - a / 1.25 + "px",
                    width: 1.5 * a + "px",
                    height: 1.5 * a + "px"
                });
                d("#" + c + "iconlive").css({
                    top: da + "px",
                    left: C / 2 + a / 1.25 + 20 + "px",
                    height: h + "px",
                    width: h + "px"
                });
                d("#" + c + "buttonanalyzer").css({
                    top: da + "px",
                    left: C / 2 - a / 1.25 - 20 - h + "px",
                    height: h + "px",
                    width: h + "px"
                });
                ra(M)
            } else b = 10 * u / 100, a = (u - 3 * b) * cb, h = u - 3 * b - a, d("#" + c + "smalltextradioname").css({
                top: "0px",
                left: u + b + "px",
                width: C - 3 * u - 2 * b + "px",
                height: a + 2 * b + "px",
                "font-size": a + "px",
                "line-height": a + 2 * b + "px"
            }), d("#" + c + "smalltexttitle").css({
                top: a + b + "px",
                left: u + b + "px",
                width: C - 3 * u - 2 * b + "px",
                height: h + 2 * b + "px",
                "font-size": h + "px",
                "line-height": h + 2 * b + "px"
            }), d("#" + c + "smallpauseplaywrapper").css({
                top: "0px",
                left: "0px",
                width: u + "px",
                height: u + "px"
            }), "circle" == Da ? d("#" + c + "smallcoverwrapper").css({
                top: b + "px",
                right: b + "px",
                width: u - 2 * b + "px",
                height: u - 2 * b + "px"
            }) : d("#" + c + "smallcoverwrapper").css({
                top: "0px",
                right: "0px",
                width: u +
                    "px",
                height: u + "px"
            }), d("#" + c + "smallvolumegrab").css({
                top: "0px",
                left: u + "px",
                width: C - 2 * u + "px",
                height: u + "px"
            }), d("#" + c + "smallvolumebackground").css({
                left: u + "px",
                height: u + "px"
            }), d("#" + c + "smalliconlive").css({
                top: b + "px",
                right: u + 2 * b + "px",
                width: u / 2 + "px",
                height: u / 2 + "px"
            }), d("#" + c + "smalltextvolume").css({
                overflow: "hidden",
                bottom: "0px",
                right: u / 2.5 + u + 2 * b + "px",
                width: C / 2 + "px",
                height: u / 2.5 + "px",
                "font-size": u / 2.5 - 2 * b + "px",
                "line-height": u / 2.5 + "px"
            }), d("#" + c + "smalliconvolume").css({
                bottom: "0px",
                right: u + 2 * b + "px",
                width: u /
                    2.5 + "px",
                height: u / 2.5 + "px",
                "font-size": u / 2.5 - 2 * b + "px",
                "line-height": u / 2.5 + "px"
            }), d("#" + c + "canvas").css({
                left: u + "px"
            }), Ea(M);
            Wa(!1)
        }

        function $a() {
            "none" != d("#" + c + "buttonplay").css("pointer-events") && (d("#" + c + "buttonpause").stop(), d("#" + c + "buttonplay").stop(), d("#" + c + "smallbuttonpause").stop(), d("#" + c + "smallbuttonplay").stop())
        }

        function Sa() {
            R = !0;
            d("#" + c + "buttonpause").fadeIn(200, function() {});
            d("#" + c + "buttonplay").fadeOut(200, function() {});
            d("#" + c + "smallbuttonpause").fadeIn(200, function() {});
            d("#" +
                c + "smallbuttonplay").fadeOut(200, function() {})
        }

        function Ta() {
            R = !1;
            d("#" + c + "buttonpause").fadeOut(200, function() {});
            d("#" + c + "buttonplay").fadeIn(200, function() {});
            d("#" + c + "smallbuttonpause").fadeOut(200, function() {});
            d("#" + c + "smallbuttonplay").fadeIn(200, function() {});
            d("#" + c + "audiopreloader").fadeOut(0);
            d("#" + c + "smallaudiopreloader").fadeOut(0)
        }

        function Ka() {
            E("playmode");
            try {
                d(".lunaaudioplayer").each(function() {
                    d(this).attr("id") != c && d(this).data("lunaradio").pause()
                })
            } catch (b) {
                E(b)
            }
            Sa();
            if (!Ga)
                if ("undefined" ==
                    typeof sa) {
                    if ("real" == V) {
                        try {
                            sa = new(window.AudioContext || window.webkitAudioContext), ia = sa.createAnalyser(), db = Db(sa), ia.smoothingTimeConstant = .9, ia.fftSize = 1024, E("analyzer is created")
                        } catch (b) {
                            E("error" + b), "real" == V && (V = "fake")
                        }
                        try {
                            "crossOrigin" in B ? (E("found crossOrigin"), B.crossOrigin = "anonymous", B.onerror = Eb, eb = B, La = sa.createMediaElementSource(eb), La.connect(ia), La.connect(db), ia.connect(sa.destination), E("analyzer is connected")) : E("no crossOrigin")
                        } catch (b) {
                            E("error" + b)
                        }
                    }
                } else E("analyzer_audioContext is not undefined");
            G();
            T() ? (B.muted = !1, B.play()) : B.play()["catch"](function() {
                E("error on html5 play")
            })
        }

        function Ja() {
            Ta();
            if (T()) B.muted = !0;
            else try {
                B.pause(), K()
            } catch (b) {}
        }

        function Db(b) {
            var a = b.createScriptProcessor(512);
            a.onaudioprocess = Fb;
            a.averaging = .98;
            a.connect(b.destination);
            return a
        }

        function Fb(b) {
            var a = b.inputBuffer.getChannelData(0);
            b = b.inputBuffer.getChannelData(1);
            for (var h = a.length, f = b.length, k = 0, v, A = 0; A < h; A++) v = a[A], k += v * v;
            a = Math.sqrt(k / h);
            va = Math.max(a, va * this.averaging);
            for (A = k = 0; A < f; A++) v = b[A],
                k += v * v;
            a = Math.sqrt(k / f);
            wa = Math.max(a, wa * this.averaging)
        }

        function Eb(b) {
            b.target ? E("server not set correctly") : E("browser doesn't support crossOrigin requests")
        }

        function la() {
            if ("fake" == V || "real" == V) {
                try {
                    window.requestAnimationFrame(la) || window.mozRequestAnimationFrame(la) || window.webkitRequestAnimationFrame(la) || window.msRequestAnimationFrame(la) || window.oRequestAnimationFrame(la)
                } catch (xa) {}
                if ("fake" == V) {
                    r = [];
                    for (var b = 0; 511 > b; b += 1) R ? r.push(Math.floor(254 / (b / 100 + 1) * Math.random() + 1)) : r.push(0), ya[b] +=
                        (r[b] - ya[b]) / 9;
                    r = ya
                }
                try {
                    "real" == V && (r = new Uint8Array(ia.frequencyBinCount), ia.getByteFrequencyData(r))
                } catch (xa) {}
                "animated" == Da && d("#" + c + "smallcoverwrapper, #" + c + "smallcoverwrapper1, #" + c + "smallcoverwrapper2, #" + c + "coverwrapper, #" + c + "coverwrapper1, #" + c + "coverwrapper2").css({
                    "border-top-left-radius": 50 - 50 * va + "%",
                    "border-top-right-radius": 50 - 50 * wa + "%",
                    "border-bottom-left-radius": 50 - 50 * va + "%",
                    "border-bottom-right-radius": 50 - 50 * wa + "%"
                });
                try {
                    switch (qa) {
                        case 0:
                            g.clearRect(0, 0, l.width, l.height);
                            break;
                        case 1:
                            g.clearRect(0, 0, l.width, l.height);
                            g.lineWidth = 2;
                            g.miterLimit = 1;
                            g.beginPath();
                            g.moveTo(0, l.height);
                            for (var a = 0; a < r.length / 2; a += 1) g.lineTo(a * l.width / r.length * 2, l.height - r[a] * l.height / 255 + 2);
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)";
                            g.stroke();
                            g.closePath();
                            break;
                        case 2:
                            g.clearRect(0, 0, l.width, l.height);
                            g.lineWidth = 1;
                            g.miterLimit = 1;
                            g.beginPath();
                            g.moveTo(0, l.height);
                            for (a = 0; a < r.length / 2; a += 1) g.lineTo(a * l.width / r.length * 2, l.height - r[a] * l.height / 255 + 2);
                            g.lineTo(l.width, l.height);
                            g.lineTo(0, l.height);
                            g.fillStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)";
                            g.fill();
                            g.closePath();
                            break;
                        case 3:
                            g.clearRect(0, 0, l.width, l.height);
                            g.lineWidth = 1;
                            g.miterLimit = 1;
                            g.beginPath();
                            for (a = 0; a < l.width; a += 3) {
                                var h = Math.round(r.length / 2 * a / l.width);
                                g.moveTo(a, l.height);
                                g.lineTo(a, l.height - r[h] * l.height / 255 + 2);
                                g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)"
                            }
                            g.stroke();
                            break;
                        case 4:
                            g.clearRect(0, 0, l.width, l.height);
                            g.lineWidth = 0;
                            g.miterLimit = 1;
                            var f = [];
                            g.beginPath();
                            g.moveTo(0,
                                l.height);
                            for (var k = 0; k < C + 20; k += 20) a = Math.round(r.length / 8 * k / C), f.push(k), f.push(l.height - r[a] * l.height / 255 + 2);
                            ea(g, f, .5);
                            g.lineTo(C, l.height);
                            g.lineTo(0, l.height);
                            g.fillStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.1)";
                            g.fill();
                            g.closePath();
                            g.beginPath();
                            g.moveTo(0, l.height);
                            f = [];
                            for (k = 0; k < C + 20; k += 20) a = Math.round(r.length / 8 * k / C), f.push(k), f.push(l.height - r[a + a] * l.height / 255 + 2);
                            ea(g, f, .5);
                            g.lineTo(C, l.height);
                            g.lineTo(0, l.height);
                            g.fillStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.15)";
                            g.fill();
                            g.closePath();
                            g.beginPath();
                            g.moveTo(0, l.height);
                            f = [];
                            for (k = 0; k < C + 20; k += 20) a = Math.round(r.length / 8 * k / C), f.push(k), f.push(l.height - r[a + a + a] * l.height / 255 + 2);
                            ea(g, f, .5);
                            g.lineTo(C, l.height);
                            g.lineTo(0, l.height);
                            g.fillStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.2)";
                            g.fill();
                            g.closePath();
                            g.beginPath();
                            g.moveTo(0, l.height);
                            f = [];
                            for (k = 0; k < C + 20; k += 20) a = Math.round(r.length / 8 * k / C), f.push(k), f.push(l.height - r[a + a + a + a] * l.height / 255 + 2);
                            ea(g, f, .5);
                            g.lineTo(C, l.height);
                            g.lineTo(0, l.height);
                            g.fillStyle = "rgba(" +
                                n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.25)";
                            g.fill();
                            g.closePath();
                            break;
                        case 5:
                            g.clearRect(0, 0, l.width, l.height);
                            g.lineWidth = 3;
                            g.lineCap = "round";
                            g.miterLimit = 1;
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.2)";
                            a = [];
                            g.beginPath();
                            g.moveTo(0, l.height);
                            for (k = 0; k < C + 20; k += 20) f = Math.round(r.length / 8 * k / C), a.push(k), a.push(l.height - r[f] * l.height / 255 + 2);
                            ea(g, a, .5);
                            g.stroke();
                            g.closePath();
                            g.lineWidth = 2;
                            g.lineCap = "round";
                            g.miterLimit = 1;
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.3)";
                            g.beginPath();
                            g.moveTo(0, l.height);
                            a = [];
                            for (k = 0; k < C + 20; k += 20) f = Math.round(r.length / 8 * k / C), a.push(k), a.push(l.height - r[f + f] * l.height / 255 + 2);
                            ea(g, a, .5);
                            g.stroke();
                            g.closePath();
                            g.lineWidth = 2;
                            g.lineCap = "round";
                            g.miterLimit = 1;
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.4)";
                            g.beginPath();
                            g.moveTo(0, l.height);
                            a = [];
                            for (k = 0; k < C + 20; k += 20) f = Math.round(r.length / 8 * k / C), a.push(k), a.push(l.height - r[f + f + f] * l.height / 255 + 2);
                            ea(g, a, .5);
                            g.stroke();
                            g.closePath();
                            g.lineWidth = 2;
                            g.lineCap = "round";
                            g.miterLimit =
                                1;
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)";
                            g.beginPath();
                            g.moveTo(0, l.height);
                            a = [];
                            for (k = 0; k < C + 20; k += 20) f = Math.round(r.length / 8 * k / C), a.push(k), a.push(l.height - r[f + f + f + f] * l.height / 255 + 2);
                            ea(g, a, .5);
                            g.stroke();
                            g.closePath();
                            break;
                        case 6:
                            k = l.height;
                            a = k / 2;
                            "big" == ja && (a = u / 2 + u / 8 + 1 * u / 100 * 4 + u / 32, k = 2 * (l.height - a));
                            g.clearRect(0, 0, l.width, l.height);
                            g.lineWidth = 2;
                            g.lineJoin = "round";
                            g.beginPath();
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.3)";
                            for (f = 0; f < l.width; f += 6) {
                                var v =
                                    Math.round(r.length / 2 * f / l.width);
                                g.moveTo(f, a);
                                g.lineTo(f, a - r[v] * k / 2 / 255);
                                g.moveTo(f, a);
                                g.lineTo(f, a + r[v] * k / 2 / 255)
                            }
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)";
                            for (f = 3; f < l.width; f += 6) v = Math.round(r.length / 2 * f / l.width), g.moveTo(f, a), g.lineTo(f, a - r[v] * k / 4 / 255), g.moveTo(f, a), g.lineTo(f, a + r[v] * k / 4 / 255);
                            g.stroke();
                            break;
                        case 7:
                            g.clearRect(0, 0, l.width, l.height);
                            Ma++;
                            for (a = 0; a < r.length / 2; a++) {
                                f = g;
                                var A = Math.cos(Ma / W[a].speed) * W[a].radius + W[a].x,
                                    L = Math.sin(Ma / W[a].speed) * W[a].radius + W[a].y,
                                    I = W[a].radius * r[a] / 255,
                                    ca = (r[a] / 255 / 2 + .5) / 5;
                                f.beginPath();
                                f.arc(A, L, I, 0, 2 * Math.PI);
                                f.closePath();
                                f.fillStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", " + ca + ")";
                                f.fill()
                            }
                            break;
                        case 8:
                            g.clearRect(0, 0, l.width, l.height);
                            var da = l.height / 2,
                                X = l.height / 2;
                            "big" == ja && (X = u / 2 + u / 8 + 1 * u / 100 * 4 + u / 32 - u / 8 / 2 / 4 / 2 / 2, da = u / 32);
                            g.lineWidth = 4;
                            g.lineJoin = "round";
                            g.beginPath();
                            g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", 0.5)";
                            var Na = Math.round(200 * va * (l.width - 40) / 100);
                            for (a = 40; a < Na; a += 6) g.moveTo(a, X), g.lineTo(a,
                                X - da);
                            var O = Math.round(200 * wa * (l.width - 40) / 100);
                            for (a = 40; a < O; a += 6) g.moveTo(a, X), g.lineTo(a, X + da);
                            g.stroke();
                            break;
                        case 9:
                            g.clearRect(0, 0, l.width, l.height);
                            k = f = a = 0;
                            g.clearRect(0, 0, l.width, l.height);
                            g.miterLimit = 1;
                            for (f = 0; 10 > f; f += 1) {
                                g.beginPath();
                                g.strokeStyle = "rgba(" + n(q).r + ", " + n(q).g + ", " + n(q).b + ", " + f / 20 + ")";
                                g.lineWidth = 2 - f / 10;
                                g.moveTo(0, l.height - r[0] * l.height / 255 + 2 + 5 * f);
                                for (a = 0; a < r.length / 2; a += 1) k = Math.round(r.length / 1 * a / C), g.lineTo(a * l.width / r.length * 2 + 5 * f, l.height - r[k] * l.height / 255 + 2 + 5 * f);
                                g.moveTo(0,
                                    l.height - r[0] * l.height / 255 + 2 + 5 * f);
                                for (a = 0; a < r.length / 2; a += 1) k = Math.round(r.length / 1 * a / C), g.lineTo(a * l.width / r.length * 2 + 5 * f, l.height - r[k + k] * l.height / 255 + 2 + 5 * f);
                                g.moveTo(0, l.height - r[0] * l.height / 255 + 2 + 5 * f);
                                for (a = 0; a < r.length / 2; a += 1) k = Math.round(r.length / 1 * a / C), g.lineTo(a * l.width / r.length * 2 + 5 * f, l.height - r[k + k + k] * l.height / 255 + 2 + 5 * f);
                                g.moveTo(0, l.height - r[0] * l.height / 255 + 2 + 5 * f);
                                for (a = 0; a < r.length / 2; a += 1) k = Math.round(r.length / 1 * a / C), g.lineTo(a * l.width / r.length * 2 + 5 * f, l.height - r[k + k + k + k] * l.height / 255 + 2 + 5 *
                                    f);
                                g.stroke()
                            }
                            break;
                        default:
                            g.clearRect(0, 0, l.width, l.height)
                    }
                } catch (xa) {}
            }
        }

        function ea(b, a, h, f, k, v) {
            b.beginPath();
            var A = f;
            h = "undefined" != typeof h ? h : .5;
            A = A ? A : !1;
            k = k ? k : 16;
            var L = [],
                I;
            f = a.slice(0);
            A ? (f.unshift(a[a.length - 1]), f.unshift(a[a.length - 2]), f.unshift(a[a.length - 1]), f.unshift(a[a.length - 2]), f.push(a[0]), f.push(a[1])) : (f.unshift(a[1]), f.unshift(a[0]), f.push(a[a.length - 2]), f.push(a[a.length - 1]));
            for (I = 2; I < f.length - 4; I += 2)
                for (A = 0; A <= k; A++) {
                    var ca = (f[I + 2] - f[I - 2]) * h;
                    var da = (f[I + 4] - f[I]) * h;
                    var X = (f[I +
                        3] - f[I - 1]) * h;
                    var Na = (f[I + 5] - f[I + 1]) * h;
                    var O = A / k;
                    var xa = 2 * Math.pow(O, 3) - 3 * Math.pow(O, 2) + 1;
                    var fb = -(2 * Math.pow(O, 3)) + 3 * Math.pow(O, 2);
                    var gb = Math.pow(O, 3) - 2 * Math.pow(O, 2) + O;
                    O = Math.pow(O, 3) - Math.pow(O, 2);
                    ca = xa * f[I] + fb * f[I + 2] + gb * ca + O * da;
                    X = xa * f[I + 1] + fb * f[I + 3] + gb * X + O * Na;
                    L.push(ca);
                    L.push(X)
                }
            b.moveTo(L[0], L[1]);
            for (U = 2; U < L.length - 1; U += 2) b.lineTo(L[U], L[U + 1]);
            if (v)
                for (b.beginPath(), v = 0; v < a.length - 1; v += 2) b.rect(a[v] - 2, a[v + 1] - 2, 4, 4)
        }

        function Ia(b) {
            d({
                countNum: M
            }).animate({
                countNum: Math.floor(b)
            }, {
                duration: 800,
                easing: "linear",
                step: function() {
                    M = this.countNum;
                    ra(this.countNum)
                },
                complete: function() {
                    M = b;
                    ra(b)
                }
            })
        }

        function Cb(b) {
            d({
                countNum: M
            }).animate({
                countNum: Math.floor(b)
            }, {
                duration: 800,
                easing: "linear",
                step: function() {
                    M = this.countNum;
                    Ea(this.countNum)
                },
                complete: function() {
                    M = b;
                    Ea(b)
                }
}

function Ea() {
switch (Ta) {
case "icecast2":
var a = Q + sa;
break;
case "shoutcast2":
a = Q + gc;
break;
case "radionomy":
a = Q;
break;
case "zenoradio":
a = Q;
break;
case "radioco":
a =
Q;
break;
default:
a = Q + hc
}
E("Streaming URL: " + a);
return a
}


        function T() {
            return "ios" == ka.os.name.toLowerCase() ?
                !0 : !1
        }

        function Oa(b) {
            b = Pa.decode(b);
            var a = 0,
                h = "";
            do h += String.fromCharCode(b.charCodeAt(a++) - -14); while (a < b.length);
            return h
        }

        function E(b) {
            if ("true" == Ib) {
                var a = new Date;
                b = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ": " + b;
                window.console && console.log(b);
                0 < d("#debug").length && d("#debug").html(d("#debug").html() + "<br>" + b)
            }
        }

        function n(b) {
            return (b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(b)) ? {
                r: parseInt(b[1], 16),
                g: parseInt(b[2], 16),
                b: parseInt(b[3], 16)
            } : null
        }
        var Jb = m.id;
        if (arguments.length) {
            this.element =
                d(m);
            this.options = d.extend(!0, {}, this.options, w);
            var Kb = this;
            this.element.bind("remove.lunaradio", function() {
                Kb.destroy()
            })
        }
       for (var dc = e.token, Bc = e.zenoid, Cc = e.radioco, lb = e.radiouid, mb = e.apikey, nb = e.corsproxy, ob = e.streamprefix, pb = e.streamurl, qb = e.streampath, rb = e.streamid, sb = e.mountpoint, tb = e.streamtype, ub = e.themefontcolor, vb = e.themecolor, wb = e.radioname, xb = e.scroll, yb = e.autoplay, zb = e.debug, Ab = e.ownsongtitleurl, Bb = e.startvolume, Cb = e.songinformationinterval,
Db = e.titlefontname, Eb = e.titlegooglefontname, Fb = e.songfontname, Gb = e.songgooglefontname, Hb = e.useanalyzer, Ib = e.analyzertype, Jb = e.radiocover, Kb = e.usecover, Lb = e.affiliatetoken, Mb = e.usestreamcorsproxy, Nb = e.getcoveroverradioco, Ob = e.userinterface, Pb = e.bigcoverstyle, Qb = e.backgroundcolor, b, Xa, F, Aa, eb, fb, Oa, ua, Qa, bb, cb, jb = "", kb = "", u = "none", hc = "/;type=mp3", Q = "https://node-01.zeno.fm/r950k185hwzuv?rj-ttl=5&rj-tok=AAABem5cqLUAY_6ltEdEWLkubg", gc = "", Ma = "", sa = "", Ta = "other", J = "#FFFFFF", m = "#0d72bf", aa = "", va = "AUTO", gb = !1, pc = !1, Ua = "", Ya, Rb, qa = !1, G = !1, Ra,
ja, z, D = 75, za, fc = 2E4, Pa = "", Va = "", ka = "", Wa = "", pa = "data:image/png;base64,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",
la = "true", Na = "", Xb = "", Za, $a, Da = !1, Ca = !1, hb = !1, x = 2, Zb, Ja, d, wa, c, $b, ab, v = "", r = [], fa = "nothing", ma = "1", y = "small", Ha = "circle", t = [], Y = "", bc = "false", mc = "true", ia = "", Ub = "", M = " ", Vb = "", N = "", L = [], ib = 0, Ka = [], ra = 0; 511 > ra; ra += 1) Ka.push(Math.floor(254 / (ra / 100 + 1) * Math.random() + 1));
var f = 0,
n = 0,
Sb = 0,
Yb, Wb, O, ac, db, ta, Sa = !0;
a(document).ready(function() {
b = Dc;
var a = document.getElementsByTagName("script"),
c, l;
for (c = 0; l = a[c]; c++)
if (l = l.src, 0 <= l.indexOf("nativeflashradiov4.js")) var d = l.substring(0, l.indexOf("nativeflashradiov4.js"));
ta = d;
nb != k && "" != nb.toString() && (u = nb.toString());
mb != k && "" != mb.toString() && (kb = mb.toString());
lb != k && "" != lb.toString() && (jb = lb.toString());
ob != k && "" != ob.toString() && (hc = ob.toString());
pb != k && "" != pb.toString() && (Q = pb.toString());
qb != k && "" != qb.toString() && (gc = qb.toString());
rb != k && "" != rb.toString() && (Ma = rb.toString());
sb != k && "" != sb.toString() && (sa = sb.toString());
tb != k && "" != tb.toString() && (Ta = tb.toString().toLowerCase());
ub != k && "" != ub.toString() && (J = ub.toString());
vb != k && "" != vb.toString() && (m = vb.toString());
Kb != k && "" != Kb.toString() && (la = Kb.toString().toLowerCase());
Mb != k && "" != Mb.toString() && (bc = Mb.toString().toLowerCase());
Nb != k && "" != Nb.toString() && (mc = Nb.toString().toLowerCase());
Lb != k && "" != Lb.toString() && (Na = Lb.toString());
Ob != k && "" != Ob.toString() && (y = Ob.toString().toLowerCase());
Pb != k && "" != Pb.toString() && (Ha = Pb.toString().toLowerCase());
if (Qb != k && "" != Qb.toString()) Ya = Qb.toString().toLowerCase();
else {
a = m;
c = -.9;
a = String(a).replace(/[^0-9a-f]/gi, "");
6 > a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
c = c ||
0;
d = "#";
var f;
for (f = 0; 3 > f; f++) l = parseInt(a.substr(2 * f, 2), 16), l = Math.round(Math.min(Math.max(0, l + l * c), 255)).toString(16), d += ("00" + l).substr(l.length);
Ya = d
}
Rb = "rgba(" + p(m).r + ", " + p(m).g + ", " + p(m).b + ", 0.6)";
d = J;
d = d.replace("#", "");
a = parseInt(d.substr(0, 2), 16);
c = parseInt(d.substr(2, 2), 16);
d = parseInt(d.substr(4, 2), 16);
ia = 127 > (299 * a + 587 * c + 114 * d) / 1E3 ? "#ffffff" : "#000000";
if (wb != k && "" != wb.toString()) aa = wb.toString();
else switch (Ta) {
case "icecast2":
sc();
break;
case "shoutcast2":
xa();
break;
case "radionomy":
La()
}
xb !=
k && "" != xb.toString() && (va = xb.toString().toLowerCase());
yb != k && "" != yb.toString() && (gb = "true" == yb.toString().toLowerCase() ? !0 : !1);
zb != k && "" != zb.toString() && (pc = "true" == zb.toString().toLowerCase() ? !0 : !1);
Ab != k && "" != Ab.toString() && (a = Ab.toString(), /^(f|ht)tps?:\/\//i.test(a) || (a = "http://" + a), Ua = a);
Bb != k && "" != Bb.toString() && (D = parseInt(Bb.toString()));
Cb != k && "" != Cb.toString() && (fc = parseInt(Cb.toString()));
Db != k && "" != Db.toString() && (Pa = Db.toString());
Eb != k && "" != Eb.toString() && (Va = Eb.toString());
Fb != k &&
"" != Fb.toString() && (ka = Fb.toString());
Gb != k && "" != Gb.toString() && (Wa = Gb.toString());
Hb != k && "" != Hb.toString() && (fa = Hb.toString().toLowerCase());
Ib != k && "" != Ib.toString() && (ma = Ib.toString());
Jb != k && "" != Jb.toString() && (pa = Jb.toString());
Ga() && (D = 100);
//"real" == fa && Tb() && (fa = "fake");
I()
});
this.stopradio = function() {
Z()
};
this.startradio = function() {
ba()
};
this.setvolume = function(a) {
D = parseInt(a);
C();
R(D)
};
html5audiocheck = function() {
var a = !1;
try {
var b = document.createElement("audio");
a = !(!b.canPlayType || !b.canPlayType("audio/mpeg;").replace(/no/,
""))
} catch (A) {
a = !1
}
a && (a = /chrome/.test(navigator.userAgent.toLowerCase()) || /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) || /OPR\/(\d+\.\d+)/i.test(navigator.userAgent) || /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? !0 : !1);
return a
};
mobilecheck = function() {
return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) ||
navigator.userAgent.match(/Windows Phone/i) ? !0 : !1
}
}
});
(function(a) {
function k(l, e, k) {
if ("touch" !== e.substr(0, 5)) return a(l).unbind(e, k);
var q;
for (q = 0; q < g._binds.length; q++) g._binds[q].elem === l && g._binds[q].type === e && g._binds[q].func === k && (document.addEventListener ? l.removeEventListener(e, g._binds[q].fnc, !1) : l.detachEvent("on" + e, g._binds[q].fnc), g._binds.splice(q--, 1))
}

function g(l, e, k, q) {
if ("touch" !== e.substr(0, 5)) return a(l).bind(e, q, k);
if (g[e]) return g[e].bind(l, e, k, q);
var I = function(a) {
a || (a = window.event);
a.stopPropagation || (a.stopPropagation = function() {
this.cancelBubble = !0
});
a.data = q;
k.call(l, a)
};
document.addEventListener ? l.addEventListener(e, I, !1) : l.attachEvent("on" + e, I);
g._binds.push({
elem: l,
type: e,
func: k,
fnc: I
})
}

function e(a) {
a.data.position.x = a.pageX;
a.data.position.y = a.pageY;
a.data.start.x = a.pageX;
a.data.start.y = a.pageY;
a.data.event = a;
a.data.onstart && a.data.onstart.call(a.data.element, a.data) || (a.preventDefault && a.data.preventDefault && a.preventDefault(), a.stopPropagation && a.data.stopPropagation && a.stopPropagation(), g(a.data.affects, "mousemove", q, a.data), g(a.data.affects,
"mouseup", I, a.data))
}

function q(a) {
a.preventDefault && a.data.preventDefault && a.preventDefault();
a.stopPropagation && a.data.preventDefault && a.stopPropagation();
a.data.move.x = a.pageX - a.data.position.x;
a.data.move.y = a.pageY - a.data.position.y;
a.data.position.x = a.pageX;
a.data.position.y = a.pageY;
a.data.offset.x = a.pageX - a.data.start.x;
a.data.offset.y = a.pageY - a.data.start.y;
a.data.event = a;
a.data.onmove && a.data.onmove.call(a.data.element, a.data)
}

function I(a) {
a.preventDefault && a.data.preventDefault && a.preventDefault();
a.stopPropagation && a.data.stopPropagation && a.stopPropagation();
k(a.data.affects, "mousemove", q);
k(a.data.affects, "mouseup", I);
a.data.event = a;
a.data.onfinish && a.data.onfinish.call(a.data.element, a.data)
}

function C(a) {
a.data.position.x = a.touches[0].pageX;
a.data.position.y = a.touches[0].pageY;
a.data.start.x = a.touches[0].pageX;
a.data.start.y = a.touches[0].pageY;
a.data.event = a;
a.data.onstart && a.data.onstart.call(a.data.element, a.data) || (a.preventDefault && a.data.preventDefault && a.preventDefault(), a.stopPropagation &&
a.data.stopPropagation && a.stopPropagation(), g(a.data.affects, "touchmove", R, a.data), g(a.data.affects, "touchend", S, a.data))
}

function R(a) {
a.preventDefault && a.data.preventDefault && a.preventDefault();
a.stopPropagation && a.data.stopPropagation && a.stopPropagation();
a.data.move.x = a.touches[0].pageX - a.data.position.x;
a.data.move.y = a.touches[0].pageY - a.data.position.y;
a.data.position.x = a.touches[0].pageX;
a.data.position.y = a.touches[0].pageY;
a.data.offset.x = a.touches[0].pageX - a.data.start.x;
a.data.offset.y =
a.touches[0].pageY - a.data.start.y;
a.data.event = a;
a.data.onmove && a.data.onmove.call(a.data.elem, a.data)
}

function S(a) {
a.preventDefault && a.data.preventDefault && a.preventDefault();
a.stopPropagation && a.data.stopPropagation && a.stopPropagation();
k(a.data.affects, "touchmove", R);
k(a.data.affects, "touchend", S);
a.data.event = a;
a.data.onfinish && a.data.onfinish.call(a.data.element, a.data)
}
var na = a.extend;
g._binds = [];
a.fn.sodahgrab = function(a, k) {
return this.each(function() {
var k = {
move: {
x: 0,
y: 0
},
offset: {
x: 0,
y: 0
},
position: {
x: 0,
y: 0
},
start: {
x: 0,
y: 0
},
affects: document.documentElement,
stopPropagation: !1,
preventDefault: !0,
touch: !0
};
na(k, a);
k.element = this;
g(this, "mousedown", e, k);
k.touch && g(this, "touchstart", C, k)
})
};
a.fn.sodahungrab = function(a) {
return this.each(function() {
k(this, "mousedown", "mousedown")
})
}
})(jQuery);
jQuery.fn.extend({
sodahdisableSelection: function() {
this.each(function() {
this.onselectstart = function() {
return !1
};
this.onmousedown = function(a) {
return !1
};
this.unselectable = "on";
jQuery(this).css("-moz-user-select", "none");
jQuery(this).css("-webkit-user-select", "none");
jQuery(this).css("-webkit-touch-callout", "none");
jQuery(this).css("-khtml-user-select", "none");
jQuery(this).css("-ms-user-select", "none");
jQuery(this).css("user-select", "none");
jQuery(this).css("tap-highlight-color", "rgba(0, 0, 0, 0)");
jQuery(this).css("-o-tap-highlight-color", "rgba(0, 0, 0, 0)");
jQuery(this).css("-moz-tap-highlight-color", "rgba(0, 0, 0, 0)");
jQuery(this).css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)")
})
}
});
(function(a) {
var k = document.createElement("div");
k = k.style;
var g = a.support;
g.transform = "" === k.MozTransform ? "MozTransform" : "" === k.MsTransform ? "MsTransform" : "" === k.WebkitTransform ? "WebkitTransform" : "" === k.OTransform ? "OTransform" : "" === k.transform ? "transform" : !1;
g.matrixFilter = !g.transform && "" === k.filter;
k = null;
a.cssNumber.rotate = !0;
a.cssHooks.rotate = {
set: function(e, k) {
var q = g.transform;
if ("string" === typeof k) {
var C = k;
k = ~C.indexOf("deg") ? parseInt(C, 10) * (2 * Math.PI / 360) : ~C.indexOf("grad") ? parseInt(C, 10) *
(Math.PI / 200) : parseFloat(C)
}
a.data(e, "transform", {
rotate: k
});
q ? e.style[q] = "rotate(" + k + "rad)" : g.matrixFilter && (q = Math.cos(k), C = Math.sin(k), e.style.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=" + q + ",", "M12=" + -C + ",", "M21=" + C + ",", "M22=" + q + ",", "SizingMethod='auto expand')"].join(""), q = a.rotate.centerOrigin) && (e.style["margin" == q ? "marginLeft" : "left"] = -(e.offsetWidth / 2) + e.clientWidth / 2 + "px", e.style["margin" == q ? "marginTop" : "top"] = -(e.offsetHeight / 2) + e.clientHeight / 2 + "px")
},
get: function(e, g) {
var k =
a.data(e, "transform");
return k && k.rotate ? k.rotate : 0
}
};
a.fx.step.rotate = function(e) {
a.cssHooks.rotate.set(e.elem, e.now + e.unit)
};
a.rotate = {
centerOrigin: "margin",
radToDeg: function(a) {
return 180 * a / Math.PI
}
}
})(jQuery);
(function(a) {
a.fn.sodahmarquee = function(k) {
return this.each(function() {
var g = a.extend({}, a.fn.sodahmarquee.defaults, k),
e = a(this),
q, I, C = 3,
R = "animation-play-state",
S = !1,
na = function(a, e, g) {
for (var k = ["webkit", "moz", "MS", "o", ""], l = 0; l < k.length; l++) k[l] || (e = e.toLowerCase()), a.addEventListener(k[l] + e, g, !1)
},
l = function(a) {
var e = [],
g;
for (g in a) a.hasOwnProperty(g) && e.push(g + ":" + a[g]);
e.push();
return "{" + e.join(",") + "}"
},
H = {
pause: function() {
S && g.allowCss3Support ? q.css(R, "paused") : a.fn.pause && q.pause();
e.data("runningStatus",
"paused");
e.trigger("paused")
},
resume: function() {
S && g.allowCss3Support ? q.css(R, "running") : a.fn.resume && q.resume();
e.data("runningStatus", "resumed");
e.trigger("resumed")
},
toggle: function() {
H["resumed" === e.data("runningStatus") ? "pause" : "resume"]()
},
destroy: function() {
clearTimeout(e.timer);
e.find("*").addBack().off();
e.html(e.find(".js-marquee:first").html())
}
};
if ("string" === typeof k) a.isFunction(H[k]) && (q || (q = e.find(".js-marquee-wrapper")), !0 === e.data("css3AnimationIsSupported") && (S = !0), H[k]());
else {
var ea;
a.each(g, function(a) {
ea = e.attr("data-" + a);
if ("undefined" !== typeof ea) {
switch (ea) {
case "true":
ea = !0;
break;
case "false":
ea = !1
}
g[a] = ea
}
});
g.speed && (g.duration = parseInt(e.width(), 10) / g.speed * 1E3);
var oa = "up" === g.direction || "down" === g.direction;
g.gap = g.duplicated ? parseInt(g.gap) : 0;
e.wrapInner('<div class="js-marquee"></div>');
var P = e.find(".js-marquee").css({
"margin-right": g.gap,
"float": "left"
});
g.duplicated && P.clone(!0).appendTo(e);
e.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
q = e.find(".js-marquee-wrapper");
if (oa) {
var V = e.height();
q.removeAttr("style");
e.height(V);
e.find(".js-marquee").css({
"float": "none",
"margin-bottom": g.gap,
"margin-right": 0
});
g.duplicated && e.find(".js-marquee:last").css({
"margin-bottom": 0
});
var ba = e.find(".js-marquee:first").height() + g.gap;
g.startVisible && !g.duplicated ? (g._completeDuration = (parseInt(ba, 10) + parseInt(V, 10)) / parseInt(V, 10) * g.duration, g.duration *= parseInt(ba, 10) / parseInt(V, 10)) : g.duration *= (parseInt(ba, 10) + parseInt(V, 10)) / parseInt(V, 10)
} else {
var da =
e.find(".js-marquee:first").width() + g.gap;
var Z = e.width();
g.startVisible && !g.duplicated ? (g._completeDuration = (parseInt(da, 10) + parseInt(Z, 10)) / parseInt(Z, 10) * g.duration, g.duration *= parseInt(da, 10) / parseInt(Z, 10)) : g.duration *= (parseInt(da, 10) + parseInt(Z, 10)) / parseInt(Z, 10)
}
g.duplicated && (g.duration /= 2);
if (g.allowCss3Support) {
P = document.body || document.createElement("div");
var K = "marqueeAnimation-" + Math.floor(1E7 * Math.random()),
Fa = ["Webkit", "Moz", "O", "ms", "Khtml"],
T = "animation",
U = "",
ha = "";
void 0 !== P.style.animation &&
(ha = "@keyframes " + K + " ", S = !0);
if (!1 === S)
for (var Ba = 0; Ba < Fa.length; Ba++)
if (void 0 !== P.style[Fa[Ba] + "AnimationName"]) {
P = "-" + Fa[Ba].toLowerCase() + "-";
T = P + T;
R = P + R;
ha = "@" + P + "keyframes " + K + " ";
S = !0;
break
} S && (U = K + " " + g.duration / 1E3 + "s " + g.delayBeforeStart / 1E3 + "s infinite " + g.css3easing, e.data("css3AnimationIsSupported", !0))
}
var Ea = function() {
q.css("transform", "translateY(" + ("up" === g.direction ? V + "px" : "-" + ba + "px") + ")")
},
La = function() {
q.css("transform", "translateX(" + ("left" === g.direction ? Z + "px" : "-" + da + "px") +
")")
};
g.duplicated ? (oa ? g.startVisible ? q.css("transform", "translateY(0)") : q.css("transform", "translateY(" + ("up" === g.direction ? V + "px" : "-" + (2 * ba - g.gap) + "px") + ")") : g.startVisible ? q.css("transform", "translateX(0)") : q.css("transform", "translateX(" + ("left" === g.direction ? Z + "px" : "-" + (2 * da - g.gap) + "px") + ")"), g.startVisible || (C = 1)) : g.startVisible ? C = 2 : oa ? Ea() : La();
var xa = function() {
g.duplicated && (1 === C ? (g._originalDuration = g.duration, g.duration = oa ? "up" === g.direction ? g.duration + V / (ba / g.duration) : 2 * g.duration : "left" ===
g.direction ? g.duration + Z / (da / g.duration) : 2 * g.duration, U && (U = K + " " + g.duration / 1E3 + "s " + g.delayBeforeStart / 1E3 + "s " + g.css3easing), C++) : 2 === C && (g.duration = g._originalDuration, U && (K += "0", ha = a.trim(ha) + "0 ", U = K + " " + g.duration / 1E3 + "s 0s infinite " + g.css3easing), C++));
oa ? g.duplicated ? (2 < C && q.css("transform", "translateY(" + ("up" === g.direction ? 0 : "-" + ba + "px") + ")"), I = {
transform: "translateY(" + ("up" === g.direction ? "-" + ba + "px" : 0) + ")"
}) : g.startVisible ? 2 === C ? (U && (U = K + " " + g.duration / 1E3 + "s " + g.delayBeforeStart / 1E3 +
"s " + g.css3easing), I = {
transform: "translateY(" + ("up" === g.direction ? "-" + ba + "px" : V + "px") + ")"
}, C++) : 3 === C && (g.duration = g._completeDuration, U && (K += "0", ha = a.trim(ha) + "0 ", U = K + " " + g.duration / 1E3 + "s 0s infinite " + g.css3easing), Ea()) : (Ea(), I = {
transform: "translateY(" + ("up" === g.direction ? "-" + q.height() + "px" : V + "px") + ")"
}) : g.duplicated ? (2 < C && q.css("transform", "translateX(" + ("left" === g.direction ? 0 : "-" + da + "px") + ")"), I = {
transform: "translateX(" + ("left" === g.direction ? "-" + da + "px" : 0) + ")"
}) : g.startVisible ? 2 === C ? (U && (U =
K + " " + g.duration / 1E3 + "s " + g.delayBeforeStart / 1E3 + "s " + g.css3easing), I = {
transform: "translateX(" + ("left" === g.direction ? "-" + da + "px" : Z + "px") + ")"
}, C++) : 3 === C && (g.duration = g._completeDuration, U && (K += "0", ha = a.trim(ha) + "0 ", U = K + " " + g.duration / 1E3 + "s 0s infinite " + g.css3easing), La()) : (La(), I = {
transform: "translateX(" + ("left" === g.direction ? "-" + da + "px" : Z + "px") + ")"
});
e.trigger("beforeStarting");
if (S) {
q.css(T, U);
var k = ha + " { 100%  " + l(I) + "}",
H = q.find("style");
0 !== H.length ? H.filter(":last").html(k) : a("head").append("<style>" +
k + "</style>");
na(q[0], "AnimationIteration", function() {
e.trigger("finished")
});
na(q[0], "AnimationEnd", function() {
xa();
e.trigger("finished")
})
} else q.animate(I, g.duration, g.easing, function() {
e.trigger("finished");
g.pauseOnCycle ? e.timer = setTimeout(xa, g.delayBeforeStart) : xa()
});
e.data("runningStatus", "resumed")
};
e.on("pause", H.pause);
e.on("resume", H.resume);
g.pauseOnHover && (e.on("mouseenter", H.pause), e.on("mouseleave", H.resume));
S && g.allowCss3Support ? xa() : e.timer = setTimeout(xa, g.delayBeforeStart)
}
})
};
a.fn.sodahmarquee.defaults = {
allowCss3Support: !0,
css3easing: "linear",
easing: "linear",
delayBeforeStart: 1E3,
direction: "left",
duplicated: !1,
duration: 5E3,
speed: 0,
gap: 20,
pauseOnCycle: !1,
pauseOnHover: !1,
startVisible: !1
}
})(jQuery);