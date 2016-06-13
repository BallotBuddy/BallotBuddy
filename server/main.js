'use strict'

let express = require('express')
let path = require('path')
let app = express()

// 89 recipes. { publisher: "", image_url: "", title: "", source_url:"" }
let superAwesomeDB = [{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35382","title":"Jalapeno Popper Grilled Cheese Sandwich","source_url":"http://www.closetcooking.com/2011/04/jalapeno-popper-grilled-cheese-sandwich.html","recipe_id":"35382","image_url":"http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg","social_rank":100,"publisher_url":"http://closetcooking.com","id":1},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35120","title":"Bacon Wrapped Jalapeno Popper Stuffed Chicken","source_url":"http://www.closetcooking.com/2012/11/bacon-wrapped-jalapeno-popper-stuffed.html","recipe_id":"35120","image_url":"http://static.food2fork.com/Bacon2BWrapped2BJalapeno2BPopper2BStuffed2BChicken2B5002B5909939b0e65.jpg","social_rank":100,"publisher_url":"http://closetcooking.com","id":2},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35171","title":"Buffalo Chicken Grilled Cheese Sandwich","source_url":"http://www.closetcooking.com/2011/08/buffalo-chicken-grilled-cheese-sandwich.html","recipe_id":"35171","image_url":"http://static.food2fork.com/Buffalo2BChicken2BGrilled2BCheese2BSandwich2B5002B4983f2702fe4.jpg","social_rank":100,"publisher_url":"http://closetcooking.com","id":4},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46908","title":"Patty Melts","source_url":"http://thepioneerwoman.com/cooking/2012/08/patty-melts/","recipe_id":"46908","image_url":"http://static.food2fork.com/pattymelt7fb3.jpg","social_rank":100,"publisher_url":"http://thepioneerwoman.com","id":5},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47078","title":"French Onion Soup Stuffed Mushrooms","source_url":"http://thepioneerwoman.com/cooking/2010/11/french-onion-soup-stuffed-mushrooms/","recipe_id":"47078","image_url":"http://static.food2fork.com/5200405868_e86da8e6e8_oceea.jpg","social_rank":100,"publisher_url":"http://thepioneerwoman.com","id":6},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47194","title":"Chicken Parmigiana","source_url":"http://thepioneerwoman.com/cooking/2009/10/chicken-parmigiana/","recipe_id":"47194","image_url":"http://static.food2fork.com/4024225151_5f477f16caabf9.jpg","social_rank":100,"publisher_url":"http://thepioneerwoman.com","id":7},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47349","title":"Holiday Bacon Appetizers","source_url":"http://thepioneerwoman.com/cooking/2007/12/flashback_1981_-_holiday_bacon_appetizers/","recipe_id":"47349","image_url":"http://static.food2fork.com/2103577050_86a171d9e005ab.jpg","social_rank":100,"publisher_url":"http://thepioneerwoman.com","id":8},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/8f3e73","title":"The Best Lasagna Ever","source_url":"http://thepioneerwoman.com/cooking/2007/06/the_best_lasagn/","recipe_id":"8f3e73","image_url":"http://static.food2fork.com/387114468_aafd1be3404a2f.jpg","social_rank":100,"publisher_url":"http://thepioneerwoman.com","id":9},{"publisher":"Two Peas and Their Pod","f2f_url":"http://food2fork.com/view/54384","title":"Stovetop Avocado Mac and Cheese","source_url":"http://www.twopeasandtheirpod.com/stovetop-avocado-mac-and-cheese/","recipe_id":"54384","image_url":"http://static.food2fork.com/avocadomacandcheesedc99.jpg","social_rank":100,"publisher_url":"http://www.twopeasandtheirpod.com","id":10},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35381","title":"Jalapeno Popper Dip","source_url":"http://www.closetcooking.com/2009/03/jalapeno-popper-dip.html","recipe_id":"35381","image_url":"http://static.food2fork.com/JalapenoPopperDip5007f1380ca.jpg","social_rank":100,"publisher_url":"http://closetcooking.com","id":11},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35169","title":"Buffalo Chicken Chowder","source_url":"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html","recipe_id":"35169","image_url":"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg","social_rank":100,"publisher_url":"http://closetcooking.com","id":12},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/36251","title":"Easy Brazilian Cheese Bread","source_url":"http://www.simplyrecipes.com/recipes/easy_brazilian_cheese_bread/","recipe_id":"36251","image_url":"http://static.food2fork.com/braziliancheesebreada300x200ffd79a7b.jpg","social_rank":100,"publisher_url":"http://simplyrecipes.com","id":13},{"publisher":"Healthy Delicious","f2f_url":"http://food2fork.com/view/0c2e90","title":"Baked Chicken and Spinach Flautas","source_url":"http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/","recipe_id":"0c2e90","image_url":"http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg","social_rank":100,"publisher_url":"http://www.healthy-delicious.com","id":14},{"publisher":"Chow","f2f_url":"http://food2fork.com/view/a75af6","title":"Thanksgiving Turkey Cake Recipe","source_url":"http://www.chow.com/recipes/29029-thanksgiving-turkey-cake","recipe_id":"a75af6","image_url":"http://static.food2fork.com/29029_turkey_cake_6207013.jpg","social_rank":99.99999999999999,"publisher_url":"http://www.chow.com","id":15},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47084","title":"Green Bean Casserole","source_url":"http://thepioneerwoman.com/cooking/2010/11/green-bean-casserole/","recipe_id":"47084","image_url":"http://static.food2fork.com/greenbeans3fa6.jpg","social_rank":99.99999999999999,"publisher_url":"http://thepioneerwoman.com","id":16},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46953","title":"Spicy Spinach-Stuffed Mushrooms","source_url":"http://thepioneerwoman.com/cooking/2012/02/spicy-spinach-stuffed-mushrooms/","recipe_id":"46953","image_url":"http://static.food2fork.com/shrooms66ca.jpg","social_rank":99.99999999999997,"publisher_url":"http://thepioneerwoman.com","id":17},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47187","title":"White Chicken Enchiladas","source_url":"http://thepioneerwoman.com/cooking/2009/11/white-chicken-enchiladas/","recipe_id":"47187","image_url":"http://static.food2fork.com/4060528829_67db52b435ebe3.jpg","social_rank":99.99999999999997,"publisher_url":"http://thepioneerwoman.com","id":18},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35111","title":"Bacon Guacamole Grilled Cheese Sandwich","source_url":"http://www.closetcooking.com/2012/01/bacon-guacamole-grilled-cheese-sandwich.html","recipe_id":"35111","image_url":"http://static.food2fork.com/Bacon2BGuacamole2BGrilled2BCheese2BSandwich2B5002B1953536bd522.jpg","social_rank":99.99999999999996,"publisher_url":"http://closetcooking.com","id":19},{"publisher":"Smitten Kitchen","f2f_url":"http://food2fork.com/view/e9e277","title":"shakshuka","source_url":"http://smittenkitchen.com/blog/2010/04/shakshuka/","recipe_id":"e9e277","image_url":"http://static.food2fork.com/4502340031_7179576398eeb7.jpg","social_rank":99.99999999999994,"publisher_url":"http://www.smittenkitchen.com","id":20},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46879","title":"Perfect Potato Soup","source_url":"http://thepioneerwoman.com/cooking/2013/01/perfect-potato-soup/","recipe_id":"46879","image_url":"http://static.food2fork.com/potatosoup66f2.jpg","social_rank":99.99999999999993,"publisher_url":"http://thepioneerwoman.com","id":21},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46982","title":"Broccoli Cheese Soup","source_url":"http://thepioneerwoman.com/cooking/2011/11/broccoli-cheese-soup/","recipe_id":"46982","image_url":"http://static.food2fork.com/broccolicf92.jpg","social_rank":99.99999999999993,"publisher_url":"http://thepioneerwoman.com","id":22},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47245","title":"Macaroni and Cheese","source_url":"http://thepioneerwoman.com/cooking/2009/04/macaroni-cheese/","recipe_id":"47245","image_url":"http://static.food2fork.com/3420436668_f56c6724c4188e3.jpg","social_rank":99.99999999999993,"publisher_url":"http://thepioneerwoman.com","id":23},{"publisher":"Serious Eats","f2f_url":"http://food2fork.com/view/ddb388","title":"In-N-Out's Double-Double, Animal Style","source_url":"http://www.seriouseats.com/recipes/2010/07/in-n-outs-double-double-animal-style-burger-recipe.html","recipe_id":"ddb388","image_url":"http://static.food2fork.com/20100723innoutprimaryb815.jpg","social_rank":99.99999999999991,"publisher_url":"http://www.seriouseats.com/","id":24},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/34678","title":"World’s Best Lasagna","source_url":"http://allrecipes.com/Recipe/Worlds-Best-Lasagna/Detail.aspx","recipe_id":"34678","image_url":"http://static.food2fork.com/3242749be.jpg","social_rank":99.9999999999999,"publisher_url":"http://allrecipes.com","id":25},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/3676","title":"Best Ever Jalapeno Poppers","source_url":"http://allrecipes.com/Recipe/Best-Ever-Jalapeno-Poppers/Detail.aspx","recipe_id":"3676","image_url":"http://static.food2fork.com/1085983c5b.jpg","social_rank":99.99999999999986,"publisher_url":"http://allrecipes.com","id":26},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/dd2ad1","title":"Bacon-Wrapped Jalapeno Thingies","source_url":"http://thepioneerwoman.com/cooking/2007/07/bacon-wrapped_j/","recipe_id":"dd2ad1","image_url":"http://static.food2fork.com/732616088_cad001b64e80ab.jpg","social_rank":99.99999999999963,"publisher_url":"http://thepioneerwoman.com","id":27},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35424","title":"Mexican Baked Eggs","source_url":"http://www.closetcooking.com/2011/09/mexican-baked-eggs.html","recipe_id":"35424","image_url":"http://static.food2fork.com/Mexican2BBaked2BEggs2B5002B685320aa856d.jpg","social_rank":99.99999999999962,"publisher_url":"http://closetcooking.com","id":28},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46893","title":"Spinach Artichoke Pasta","source_url":"http://thepioneerwoman.com/cooking/2012/10/spinach-artichoke-pasta/","recipe_id":"46893","image_url":"http://static.food2fork.com/artichoke821e.jpg","social_rank":99.99999999999959,"publisher_url":"http://thepioneerwoman.com","id":29},{"publisher":"101 Cookbooks","f2f_url":"http://food2fork.com/view/47746","title":"Best Pizza Dough Ever","source_url":"http://www.101cookbooks.com/archives/001199.html","recipe_id":"47746","image_url":"http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg","social_rank":100,"publisher_url":"http://www.101cookbooks.com","id":30},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46956","title":"Deep Dish Fruit Pizza","source_url":"http://thepioneerwoman.com/cooking/2012/01/fruit-pizza/","recipe_id":"46956","image_url":"http://static.food2fork.com/fruitpizza9a19.jpg","social_rank":100,"publisher_url":"http://thepioneerwoman.com","id":31},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35477","title":"Pizza Dip","source_url":"http://www.closetcooking.com/2011/03/pizza-dip.html","recipe_id":"35477","image_url":"http://static.food2fork.com/Pizza2BDip2B12B500c4c0a26c.jpg","social_rank":99.99999999999994,"publisher_url":"http://closetcooking.com","id":32},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/41470","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","source_url":"http://www.closetcooking.com/2013/02/cauliflower-pizza-crust-with-bbq.html","recipe_id":"41470","image_url":"http://static.food2fork.com/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg","social_rank":99.9999999999994,"publisher_url":"http://closetcooking.com","id":33},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35478","title":"Pizza Quesadillas (aka Pizzadillas)","source_url":"http://www.closetcooking.com/2012/11/pizza-quesadillas-aka-pizzadillas.html","recipe_id":"35478","image_url":"http://static.food2fork.com/Pizza2BQuesadillas2B2528aka2BPizzadillas25292B5002B834037bf306b.jpg","social_rank":99.99999999999835,"publisher_url":"http://closetcooking.com","id":34},{"publisher":"Two Peas and Their Pod","f2f_url":"http://food2fork.com/view/54454","title":"Sweet Potato Kale Pizza with Rosemary & Red Onion","source_url":"http://www.twopeasandtheirpod.com/sweet-potato-kale-pizza-with-rosemary-red-onion/","recipe_id":"54454","image_url":"http://static.food2fork.com/sweetpotatokalepizza2c6db.jpg","social_rank":99.9999999991673,"publisher_url":"http://www.twopeasandtheirpod.com","id":35},{"publisher":"My Baking Addiction","f2f_url":"http://food2fork.com/view/2ec050","title":"Pizza Dip","source_url":"http://www.mybakingaddiction.com/pizza-dip/","recipe_id":"2ec050","image_url":"http://static.food2fork.com/PizzaDip21of14f05.jpg","social_rank":99.99999999826605,"publisher_url":"http://www.mybakingaddiction.com","id":36},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/6fab1c","title":"Pizza Potato Skins","source_url":"http://thepioneerwoman.com/cooking/2013/04/pizza-potato-skins/","recipe_id":"6fab1c","image_url":"http://static.food2fork.com/pizza3464.jpg","social_rank":99.99999999760887,"publisher_url":"http://thepioneerwoman.com","id":37},{"publisher":"Bon Appetit","f2f_url":"http://food2fork.com/view/49346","title":"No-Knead Pizza Dough","source_url":"http://www.bonappetit.com/recipes/2012/03/no-knead-pizza-dough","recipe_id":"49346","image_url":"http://static.food2fork.com/nokneadpizzadoughlahey6461467.jpg","social_rank":99.99999999743466,"publisher_url":"http://www.bonappetit.com","id":38},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/36453","title":"Homemade Pizza","source_url":"http://www.simplyrecipes.com/recipes/homemade_pizza/","recipe_id":"36453","image_url":"http://static.food2fork.com/pizza292x2007a259a79.jpg","social_rank":99.99999998833789,"publisher_url":"http://simplyrecipes.com","id":39},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35626","title":"Taco Quesadilla Pizzas","source_url":"http://www.closetcooking.com/2012/08/taco-quesadilla-pizza.html","recipe_id":"35626","image_url":"http://static.food2fork.com/Taco2BQuesadilla2BPizza2B5002B4417a4755e35.jpg","social_rank":99.99999998319973,"publisher_url":"http://closetcooking.com","id":40},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/17796","title":"Jay’s Signature Pizza Crust","source_url":"http://allrecipes.com/Recipe/Jays-Signature-Pizza-Crust/Detail.aspx","recipe_id":"17796","image_url":"http://static.food2fork.com/237891b5e4.jpg","social_rank":99.99999997246182,"publisher_url":"http://allrecipes.com","id":41},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35097","title":"Avocado Breakfast Pizza with Fried Egg","source_url":"http://www.closetcooking.com/2012/07/avocado-breakfast-pizza-with-fried-egg.html","recipe_id":"35097","image_url":"http://static.food2fork.com/Avocado2Band2BFried2BEgg2BBreakfast2BPizza2B5002B296294dcea8a.jpg","social_rank":99.99999990783806,"publisher_url":"http://closetcooking.com","id":42},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46895","title":"Pepperoni Pizza Burgers","source_url":"http://thepioneerwoman.com/cooking/2012/10/pepperoni-pizza-burgers/","recipe_id":"46895","image_url":"http://static.food2fork.com/pizzaburgera5bd.jpg","social_rank":99.99999990525365,"publisher_url":"http://thepioneerwoman.com","id":43},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35635","title":"Thai Chicken Pizza with Sweet Chili Sauce","source_url":"http://www.closetcooking.com/2012/02/thai-chicken-pizza-with-sweet-chili.html","recipe_id":"35635","image_url":"http://static.food2fork.com/Thai2BChicken2BPizza2Bwith2BSweet2BChili2BSauce2B5002B435581bcf578.jpg","social_rank":99.99999990065892,"publisher_url":"http://closetcooking.com","id":44},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47000","title":"One Basic Pizza Crust","source_url":"http://thepioneerwoman.com/cooking/2011/09/steakhouse-pizza/","recipe_id":"47000","image_url":"http://static.food2fork.com/steakhousepizza0b87.jpg","social_rank":99.99999981149679,"publisher_url":"http://thepioneerwoman.com","id":45},{"publisher":"Two Peas and Their Pod","f2f_url":"http://food2fork.com/view/54491","title":"Peach, Basil, Mozzarella, & Balsamic Pizza","source_url":"http://www.twopeasandtheirpod.com/peach-basil-mozzarella-balsamic-pizza/","recipe_id":"54491","image_url":"http://static.food2fork.com/peachbasilpizza6c7de.jpg","social_rank":99.99999980232263,"publisher_url":"http://www.twopeasandtheirpod.com","id":46},{"publisher":"Real Simple","f2f_url":"http://food2fork.com/view/38812","title":"English-Muffin Egg Pizzas","source_url":"http://www.realsimple.com/food-recipes/browse-all-recipes/english-muffin-egg-pizzas-10000000663044/index.html","recipe_id":"38812","image_url":"http://static.food2fork.com/pizza_300d938bd58.jpg","social_rank":99.99999978548222,"publisher_url":"http://realsimple.com","id":47},{"publisher":"My Baking Addiction","f2f_url":"http://food2fork.com/view/dd21dd","title":"Simple No Knead Pizza Dough","source_url":"http://www.mybakingaddiction.com/no-knead-pizza-dough-recipe/","recipe_id":"dd21dd","image_url":"http://static.food2fork.com/PizzaDough1of12edit5779.jpg","social_rank":99.9999995838859,"publisher_url":"http://www.mybakingaddiction.com","id":48},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47011","title":"Grilled Veggie Pizza","source_url":"http://thepioneerwoman.com/cooking/2011/07/grilled-vegetable-pizza/","recipe_id":"47011","image_url":"http://static.food2fork.com/grilledveggie79bd.jpg","social_rank":99.99999947603048,"publisher_url":"http://thepioneerwoman.com","id":49},{"publisher":"My Baking Addiction","f2f_url":"http://food2fork.com/view/0fb8f4","title":"Spicy Chicken and Pepper Jack Pizza","source_url":"http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/","recipe_id":"0fb8f4","image_url":"http://static.food2fork.com/FlatBread21of1a180.jpg","social_rank":99.99999927351223,"publisher_url":"http://www.mybakingaddiction.com","id":50},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/12913","title":"Exquisite Pizza Sauce","source_url":"http://allrecipes.com/Recipe/Exquisite-Pizza-Sauce/Detail.aspx","recipe_id":"12913","image_url":"http://static.food2fork.com/23868217b6.jpg","social_rank":99.99999884376517,"publisher_url":"http://allrecipes.com","id":51},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/36476","title":"How to Grill Pizza","source_url":"http://www.simplyrecipes.com/recipes/how_to_grill_pizza/","recipe_id":"36476","image_url":"http://static.food2fork.com/howtogrillpizzad300x20086a60e1b.jpg","social_rank":99.99999704095504,"publisher_url":"http://simplyrecipes.com","id":52},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47161","title":"PW’s Favorite Pizza","source_url":"http://thepioneerwoman.com/cooking/2010/02/my-favorite-pizza/","recipe_id":"47161","image_url":"http://static.food2fork.com/4364270576_302751a2a4f3c1.jpg","social_rank":99.99999689667648,"publisher_url":"http://thepioneerwoman.com","id":53},{"publisher":"My Baking Addiction","f2f_url":"http://food2fork.com/view/a723e8","title":"Barbecue Chicken Pizza","source_url":"http://www.mybakingaddiction.com/barbecue-chicken-pizza-recipe/","recipe_id":"a723e8","image_url":"http://static.food2fork.com/BBQChickenPizza3e2b.jpg","social_rank":99.9999968917598,"publisher_url":"http://www.mybakingaddiction.com","id":54},{"publisher":"Two Peas and Their Pod","f2f_url":"http://food2fork.com/view/54388","title":"Avocado Pita Pizza with Cilantro Sauce","source_url":"http://www.twopeasandtheirpod.com/avocado-pita-pizza-with-cilantro-sauce/","recipe_id":"54388","image_url":"http://static.food2fork.com/avocadopizzawithcilantrosauce4bf5.jpg","social_rank":99.99999665701256,"publisher_url":"http://www.twopeasandtheirpod.com","id":55},{"publisher":"BBC Good Food","f2f_url":"http://food2fork.com/view/cb13dd","title":"Pizza margherita in 4 easy steps","source_url":"http://www.bbcgoodfood.com/recipes/4683/pizza-margherita-in-4-easy-steps","recipe_id":"cb13dd","image_url":"http://static.food2fork.com/4683_MEDIUM544c.jpg","social_rank":99.99999624664413,"publisher_url":"http://www.bbcgoodfood.com","id":56},{"publisher":"What's Gaby Cooking","f2f_url":"http://food2fork.com/view/ead4e0","title":"Pizza Monkey Bread","source_url":"http://whatsgabycooking.com/pizza-monkey-bread/","recipe_id":"ead4e0","image_url":"http://static.food2fork.com/PizzaMonkeyBread67f8.jpg","social_rank":99.99999570141472,"publisher_url":"http://whatsgabycooking.com","id":57},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/46892","title":"Supreme Pizza Burgers","source_url":"http://thepioneerwoman.com/cooking/2012/10/supreme-pizza-burgers/","recipe_id":"46892","image_url":"http://static.food2fork.com/burger53be.jpg","social_rank":99.99999283988569,"publisher_url":"http://thepioneerwoman.com","id":58},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35128","title":"Balsamic Strawberry and Chicken Pizza with Sweet Onions and Smoked Bacon","source_url":"http://www.closetcooking.com/2012/07/balsamic-strawberry-and-chicken-pizza.html","recipe_id":"35128","image_url":"http://static.food2fork.com/Strawberry2BBalsamic2BPizza2Bwith2BChicken252C2BSweet2BOnion2Band2BSmoked2BBacon2B5002B300939d125e2.jpg","social_rank":99.99998682928603,"publisher_url":"http://closetcooking.com","id":59},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/12360","title":"Easy Slow Cooker French Dip","source_url":"http://allrecipes.com/Recipe/Easy-Slow-Cooker-French-Dip/Detail.aspx","recipe_id":"12360","image_url":"http://static.food2fork.com/103167cea.jpg","social_rank":100,"publisher_url":"http://allrecipes.com","id":60},{"publisher":"Healthy Delicious","f2f_url":"http://food2fork.com/view/0c2e90","title":"Baked Chicken and Spinach Flautas","source_url":"http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/","recipe_id":"0c2e90","image_url":"http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg","social_rank":100,"publisher_url":"http://www.healthy-delicious.com","id":61},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/47062","title":"Beef Stew with Beer and Paprika","source_url":"http://thepioneerwoman.com/cooking/2011/01/beef-stew-with-beer-and-paprika/","recipe_id":"47062","image_url":"http://static.food2fork.com/5337021451_e35711f343_o3593.jpg","social_rank":99.99999999999977,"publisher_url":"http://thepioneerwoman.com","id":62},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/29057","title":"Slow Cooker Pulled Pork","source_url":"http://allrecipes.com/Recipe/Slow-Cooker-Pulled-Pork/Detail.aspx","recipe_id":"29057","image_url":"http://static.food2fork.com/586964c174.jpg","social_rank":99.99999999999972,"publisher_url":"http://allrecipes.com","id":63},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/28924","title":"Slow Cooker Chicken Taco Soup","source_url":"http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Taco-Soup/Detail.aspx","recipe_id":"28924","image_url":"http://static.food2fork.com/9843414ab7.jpg","social_rank":99.99999999999945,"publisher_url":"http://allrecipes.com","id":64},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35168","title":"Buffalo Chicken Chili","source_url":"http://www.closetcooking.com/2012/04/buffalo-chicken-chili.html","recipe_id":"35168","image_url":"http://static.food2fork.com/Buffalo2BChicken2BChili2B5002B9548b7d71737.jpg","social_rank":99.99999999999191,"publisher_url":"http://closetcooking.com","id":65},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/4386","title":"Boilermaker Tailgate Chili","source_url":"http://allrecipes.com/Recipe/Boilermaker-Tailgate-Chili/Detail.aspx","recipe_id":"4386","image_url":"http://static.food2fork.com/890638f7df.jpg","social_rank":99.9999999994656,"publisher_url":"http://allrecipes.com","id":66},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35109","title":"Bacon Double Cheeseburger Soup","source_url":"http://www.closetcooking.com/2012/09/bacon-double-cheeseburger-soup.html","recipe_id":"35109","image_url":"http://static.food2fork.com/Bacon2BDouble2BCheeseburger2BSoup2B5002B0677c192317c.jpg","social_rank":99.99999999937391,"publisher_url":"http://closetcooking.com","id":67},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/13344","title":"Fish Tacos","source_url":"http://allrecipes.com/Recipe/Fish-Tacos/Detail.aspx","recipe_id":"13344","image_url":"http://static.food2fork.com/317051ed90.jpg","social_rank":99.99999999912079,"publisher_url":"http://allrecipes.com","id":68},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35136","title":"Beer Mac n Cheese Soup","source_url":"http://www.closetcooking.com/2012/10/beer-mac-n-cheese-soup.html","recipe_id":"35136","image_url":"http://static.food2fork.com/Beer2BMac2Bn2BCheese2BSoup2B5002B3748fc1ba0f0.jpg","social_rank":99.99999999694427,"publisher_url":"http://closetcooking.com","id":69},{"publisher":"101 Cookbooks","f2f_url":"http://food2fork.com/view/47647","title":"Chocolate Bundt Cake","source_url":"http://www.101cookbooks.com/archives/chocolate-bundt-cake-recipe.html","recipe_id":"47647","image_url":"http://static.food2fork.com/chocolate_bundt_cake_recipeec22.jpg","social_rank":99.99999997558612,"publisher_url":"http://www.101cookbooks.com","id":70},{"publisher":"101 Cookbooks","f2f_url":"http://food2fork.com/view/47652","title":"Maple Buttermilk Pie","source_url":"http://www.101cookbooks.com/archives/maple-buttermilk-pie-recipe.html","recipe_id":"47652","image_url":"http://static.food2fork.com/maple_buttermilk_pie_recipe4db5.jpg","social_rank":99.99999997433719,"publisher_url":"http://www.101cookbooks.com","id":71},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/35788","title":"Beer Can Chicken","source_url":"http://www.simplyrecipes.com/recipes/beer_can_chicken/","recipe_id":"35788","image_url":"http://static.food2fork.com/beercanchickena300x2001d673ef8.jpg","social_rank":99.99999961040659,"publisher_url":"http://simplyrecipes.com","id":72},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/36500","title":"Irish Beef Stew","source_url":"http://www.simplyrecipes.com/recipes/irish_beef_stew/","recipe_id":"36500","image_url":"http://static.food2fork.com/irishbeefstew300x200056e7e3c.jpg","social_rank":99.99999948038301,"publisher_url":"http://simplyrecipes.com","id":73},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35265","title":"Crispy Baked Onion Rings","source_url":"http://www.closetcooking.com/2012/11/crispy-baked-onion-rings.html","recipe_id":"35265","image_url":"http://static.food2fork.com/Crispy2BBaked2BOnion2BRings2B5002B549031e96d5d.jpg","social_rank":99.99999920003073,"publisher_url":"http://closetcooking.com","id":74},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/41455","title":"Beer Battered Crispy Baked Pickle Fries","source_url":"http://www.closetcooking.com/2013/02/beer-battered-crispy-baked-pickle-fries.html","recipe_id":"41455","image_url":"http://static.food2fork.com/Beer2BBattered2BCrispy2BBaked2BPickle2BFries2B5002B1479c5c9de6d.jpg","social_rank":99.99999885883223,"publisher_url":"http://closetcooking.com","id":75},{"publisher":"Smitten Kitchen","f2f_url":"http://food2fork.com/view/fa8d56","title":"cheddar, beer and mustard pull-apart bread","source_url":"http://smittenkitchen.com/blog/2012/02/cheddar-beer-and-mustard-pull-apart-bread/","recipe_id":"fa8d56","image_url":"http://static.food2fork.com/6813622849_dbd0933bda7481.jpg","social_rank":99.99999818349936,"publisher_url":"http://www.smittenkitchen.com","id":76},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/35996","title":"Chocolate Guinness Cake","source_url":"http://www.simplyrecipes.com/recipes/chocolate_guinness_cake/","recipe_id":"35996","image_url":"http://static.food2fork.com/chocolateguinnesscakea300x200f423d701.jpg","social_rank":99.99999678107233,"publisher_url":"http://simplyrecipes.com","id":77},{"publisher":"101 Cookbooks","f2f_url":"http://food2fork.com/view/47866","title":"Roasted Winter Squash Salad","source_url":"http://www.101cookbooks.com/archives/roasted-winter-squash-salad-recipe.html","recipe_id":"47866","image_url":"http://static.food2fork.com/winter_squash453d.jpg","social_rank":99.99999591717959,"publisher_url":"http://www.101cookbooks.com","id":78},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/15823","title":"Guinness&#174; Corned Beef","source_url":"http://allrecipes.com/Recipe/Guinness-Corned-Beef/Detail.aspx","recipe_id":"15823","image_url":"http://static.food2fork.com/49095f45b.jpg","social_rank":99.99998815914886,"publisher_url":"http://allrecipes.com","id":79},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35234","title":"Chorizo Queso Fundido","source_url":"http://www.closetcooking.com/2012/12/chorizo-queso-fundido.html","recipe_id":"35234","image_url":"http://static.food2fork.com/Chorizo2BQueso2BFundido2B5002B83620343573f.jpg","social_rank":99.99998757925133,"publisher_url":"http://closetcooking.com","id":80},{"publisher":"The Pioneer Woman","f2f_url":"http://food2fork.com/view/72cfa5","title":"Guinness (or any Beer) Float","source_url":"http://thepioneerwoman.com/cooking/2013/06/guinness-float-in-june/","recipe_id":"72cfa5","image_url":"http://static.food2fork.com/floatc342.jpg","social_rank":99.99998403879285,"publisher_url":"http://thepioneerwoman.com","id":81},{"publisher":"101 Cookbooks","f2f_url":"http://food2fork.com/view/47608","title":"Gougres","source_url":"http://www.101cookbooks.com/archives/gougares-recipe.html","recipe_id":"47608","image_url":"http://static.food2fork.com/gougeres237e.jpg","social_rank":99.99998177095583,"publisher_url":"http://www.101cookbooks.com","id":82},{"publisher":"Simply Recipes","f2f_url":"http://food2fork.com/view/36227","title":"Dark and Stormy","source_url":"http://www.simplyrecipes.com/recipes/dark_and_stormy/","recipe_id":"36227","image_url":"http://static.food2fork.com/darkandstormy300x20087c56006.jpg","social_rank":99.99994673927019,"publisher_url":"http://simplyrecipes.com","id":83},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35267","title":"Crispy Beer Battered Fish Sandwich","source_url":"http://www.closetcooking.com/2011/03/crispy-beer-battered-fish-sandwich.html","recipe_id":"35267","image_url":"http://static.food2fork.com/Crispy2BBeer2BBattered2BFish2BSandwich2Bwith2BColeslaw2Band2BTartar2BSauce2Band2Ba2BSide2Bof2BFries2B2B12B500a7dee810.jpg","social_rank":99.99991582841521,"publisher_url":"http://closetcooking.com","id":84},{"publisher":"All Recipes","f2f_url":"http://food2fork.com/view/3472","title":"Beer Margaritas","source_url":"http://allrecipes.com/Recipe/Beer-Margaritas/Detail.aspx","recipe_id":"3472","image_url":"http://static.food2fork.com/1769199594.jpg","social_rank":99.99990427088606,"publisher_url":"http://allrecipes.com","id":85},{"publisher":"Closet Cooking","f2f_url":"http://food2fork.com/view/35631","title":"Texmex Sloppy Joes","source_url":"http://www.closetcooking.com/2012/06/texmex-sloppy-joes.html","recipe_id":"35631","image_url":"http://static.food2fork.com/Texmex2BSloppy2BJoes2B5002B04666b200ac4.jpg","social_rank":99.99973159557163,"publisher_url":"http://closetcooking.com","id":86},{"publisher":"A Spicy Perspective","f2f_url":"http://food2fork.com/view/405196","title":"Apple Beer Bread","source_url":"http://www.aspicyperspective.com/2013/03/beer-bread.html","recipe_id":"405196","image_url":"http://static.food2fork.com/IMG_5828180x1801df4.jpg","social_rank":99.99969964165493,"publisher_url":"http://www.aspicyperspective.com","id":87},{"publisher":"Chow","f2f_url":"http://food2fork.com/view/3760f7","title":"Michelada Recipe","source_url":"http://www.chow.com/recipes/10662-michelada","recipe_id":"3760f7","image_url":"http://static.food2fork.com/10662_RecipeImage_620x413_michelada0349.jpg","social_rank":99.99948123520704,"publisher_url":"http://www.chow.com","id":88},{"publisher":"Bon Appetit","f2f_url":"http://food2fork.com/view/49639","title":"Shrimp & Grits","source_url":"http://www.bonappetit.com/recipes/2011/09/shrimp-and-grits","recipe_id":"49639","image_url":"http://static.food2fork.com/breakfastshrimpgrits6465821.jpg","social_rank":99.99928092350213,"publisher_url":"http://www.bonappetit.com","id":89}];

app.use(express.static(path.join(__dirname, "../dist")))

app.route('/recipes')
  .get(function(req,res){
    res.send(JSON.stringify(superAwesomeDB))
  })
  .all(function(req,res){
    res.send("Try using GET instead of POST")
  })

app.get('*', function(req, res){
  res.redirect('/')
})

app.listen(8080)
console.log("Listening on 8080\n\n GET: '/'  Get all recipes")