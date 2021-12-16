<!DOCTYPE HTML>
<!--
	Using skel jquery library on https://github.com/n33/skel
	and css3 font-awesome from http://fortawesome.github.io/Font-Awesome/
	Please support original developers, they has done a great opensource job
	Used to get a responsive alternative site.
	Personalized by Bit.
-->

<?php

$useragent=$_SERVER['HTTP_USER_AGENT'];
$isMobile = False;
if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))){
        $isMobile = True;
}

?>

<html>
	<head>
		<title>Bitstuffing responsive html5/css3/jquery alpha revision</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<link rel="stylesheet" href="assets/css/font-awesome.min.css" />
                <?php if($isMobile){ ?>
                <link href="css/main-base.css" rel="stylesheet" type="text/css" >
		<link href="https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal.min.css" rel="stylesheet" type="text/css" >
		<link href="https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal-default-theme.css" rel="stylesheet" type="text/css" >
                <?php } ?>
	</head>
	<body>

		<!-- Main container -->
			<div id="wrapper">

				<!-- Header -->
					<header id="header">
						<h1>bitstuffing.github.io</h1> <!--uppercased with css -->
						<nav class="main">
							<ul>
								<li class="menu">
									<a class="fa-bars" href="#menu">Menu</a>
								</li>
							</ul>
						</nav>

					</header>

				<!-- Menu with sections, it fills the upper bar from right to left -->
					<section id="menu">

							<section>
								<ul class="links">
									<li>
										<a href="#">
											<p>Powered by</p>
											<a class="author" href="https://github.com/bitstuffing"><img alt="" src="https://avatars1.githubusercontent.com/u/15215960?v=3&amp;s=460" alt="Bit"></a>
											<h3>Bit</h3>
											<p>If you are seeking who am I read my SecureCV (with password):</p>
											<a href="http://bitstuffing.github.io/securecv" alt="bitstuffing.github.io alpha1 revision">SecureCV</a>
										</a>
									</li>

								</ul>
							</section>

					</section>

				<!-- Main -->
					<div id="main">

						<!-- Posts filled by js -->




						<!-- Pagination commented, TODO, review to only show the first 5 elements and use API to get more
							<ul class="actions pagination">
								<li><a href="" class="disabled button big previous">Next</a></li>
								<li><a href="#" class="button big next">Before</a></li>
							</ul>
						-->
					</div>

				<!-- Sidebar -->
					<section id="sidebar">

						<!-- Summary -->
							<section id="intro">
								<header>
									<h2>Bitstuffing</h2>
									<p>Mobile-Responsive html5/css3/jquery</p>
								</header>
							</section>


						<!-- Lists of apps. TODO: put it automatic with an xml on the main server -->
							<section>
								<ul class="posts">
                                                                        <li>
										<article>
											<header>
												<h3>RemoteSession</h3>
												<time class="published" datetime="2016-02-26">April 02, 2017</time>
											</header>
											<a href="https://github.com/bitstuffing/remotesession" class="image"><img src="https://camo.githubusercontent.com/4f8574fdf0ac1e4b4a41b33a869098ba8df0307f/687474703a2f2f692e696d6775722e636f6d2f6c4942336f5a482e706e67" alt="" /></a>
										</article>
									</li>
                                                                        <li>
										<article>
											<header>
												<h3>Kivy Downloader</h3>
												<time class="published" datetime="2015-11-22">March 31, 2016</time>
											</header>
											<a href="https://github.com/bitstuffing/kivy-downloader" class="image"><img src="https://camo.githubusercontent.com/1d3a5d6157eda4895ded903db99452cad71a71d7/68747470733a2f2f332e62702e626c6f6773706f742e636f6d2f2d48426e532d3264796762382f56767a2d33574e704b57492f414141414141414141534d2f67464d3936414f754e394d4c76637a456e756561432d636c795f466746385555772f733332302f666f726d312e706e67" alt="" /></a>
										</article>
									</li>
									<li>
										<article>
											<header>
												<h3>Kore (fork) with TVBOX support</h3>
												<time class="published" datetime="2016-02-26">February 26, 2016</time>
											</header>
											<a href="/asserts/org.xbmc.kore.apk" class="image"><img src="https://f-droid.org/repo/org.xbmc.kore/en-US/icon.png" alt="" /></a>
										</article>
									</li>
									<li>
										<article>
											<header>
												<h3>Jukebox addon for Kodi</h3>
												<time class="published" datetime="2015-11-22">November 22, 2015</time>
											</header>
											<a href="https://github.com/bitstuffing/jukebox/archive/master.zip" class="image"><img src="https://github.com/bitstuffing/jukebox/raw/master/icon.png" alt="" /></a>
										</article>
									</li>
                                                                        <li>
										<article>
											<header>
												<h3>TVBOX addon for Kodi</h3>
												<time class="published" datetime="2015-11-11">November 11, 2015</time>
											</header>
											<a href="https://github.com/bitstuffing/tvbox/archive/master.zip" class="image"><img src="https://raw.githubusercontent.com/bitstuffing/tvbox/master/icon.png" alt="TVBOX icon" /></a>
										</article>
									</li>
								</ul>
							</section>

						<!-- About blur -->
							<section class="blurb">
								<h2>About</h2>
								<p>Bitstuffing mobile is a responsive html5/css3/jquery page for a simple and quick web solution.</p>
								<p>Designed to close the mouth to the people who don't know about what they are talking about.</p>
								<p>Using opensource <a href="https://github.com/n33/skel" alt="skel great js library">n33/skel</a> js library.</p>
							</section>

						<!-- Footer with social networks -->
							<section id="footer">
								<ul class="icons">
									<li><a href="https://twitter.com/bitstuffing" class="fa-twitter"><span class="label">Twitter</span></a></li>
									<li><a href="https://facebook.com/bitstuffing" class="fa-facebook"><span class="label">Facebook</span></a></li>
									<li><a href="https://instagram.com/bitstuffing" class="fa-instagram"><span class="label">Instagram</span></a></li>
									<li><a href="http://harddevelop.blogspot.com/feeds/posts/default" class="fa-rss"><span class="label">RSS</span></a></li>
								</ul>
							</section>

					</section>

			</div>

		<script type="text/javascript" src="http://code.jquery.com/jquery-1.12.1.min.js"></script>
		<script type="text/javascript" src="http://rawgit.com/n33/skel/master/src/skel.js"></script>
		<script type="text/javascript" src="assets/js/util.js"></script>
		<script type="text/javascript" src="assets/js/main.js"></script>
                <?php if($isMobile){ ?>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal.min.js"></script>
		<script type="text/javascript" src="js/mobile.js" ></script>
                <?php } else { ?>
                <script type="text/javascript" src="js/desktop.js" ></script>
                <?php } ?>
	</body>
</html>
