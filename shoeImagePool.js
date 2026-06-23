// Bản đồ hình ảnh Pexels chính xác theo từng sản phẩm, loại bỏ hoàn toàn các hình dính người mẫu, tay cầm chơi game, rổ bóng
const PRODUCT_IMAGES = {
  "Nike Phantom GT2 Club TF": [
    "https://images.pexels.com/photos/30490956/pexels-photo-30490956.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/9519502/pexels-photo-9519502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/36429409/pexels-photo-36429409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32941076/pexels-photo-32941076.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas X Speedportal.3 TF": [
    "https://images.pexels.com/photos/32925319/pexels-photo-32925319.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/34717376/pexels-photo-34717376.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923065/pexels-photo-10923065.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Puma Future 7 Play TF": [
    "https://images.pexels.com/photos/9519502/pexels-photo-9519502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5733516/pexels-photo-5733516.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/36429409/pexels-photo-36429409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Joma Top Flex TF": [
    "https://images.pexels.com/photos/16499006/pexels-photo-16499006.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10347804/pexels-photo-10347804.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/29925640/pexels-photo-29925640.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/17955023/pexels-photo-17955023.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Kamito Veloce TF Pro": [
    "https://images.pexels.com/photos/9519502/pexels-photo-9519502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/36429409/pexels-photo-36429409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30490956/pexels-photo-30490956.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Mizuno Morelia Neo IV TF": [
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32962876/pexels-photo-32962876.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923069/pexels-photo-10923069.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Mercurial Vapor 15 Club FG": [
    "https://images.pexels.com/photos/27299906/pexels-photo-27299906.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/19882423/pexels-photo-19882423.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923062/pexels-photo-10923062.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/274385/pexels-photo-274385.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Predator Club FG": [
    "https://images.pexels.com/photos/10923068/pexels-photo-10923068.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923070/pexels-photo-10923070.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923064/pexels-photo-10923064.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923065/pexels-photo-10923065.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Mizuno Monarcida Neo II FG": [
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923069/pexels-photo-10923069.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923067/pexels-photo-10923067.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32797683/pexels-photo-32797683.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Phantom GT2 Academy IC": [
    "https://images.pexels.com/photos/19882423/pexels-photo-19882423.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/27299906/pexels-photo-27299906.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923060/pexels-photo-10923060.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30490956/pexels-photo-30490956.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Copa Pure.3 IN": [
    "https://images.pexels.com/photos/14690051/pexels-photo-14690051.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32925319/pexels-photo-32925319.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/34717376/pexels-photo-34717376.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923070/pexels-photo-10923070.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Joma Top Flex IN": [
    "https://images.pexels.com/photos/35214843/pexels-photo-35214843.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/14690051/pexels-photo-14690051.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/16378320/pexels-photo-16378320.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/37097046/pexels-photo-37097046.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Kamito Stellar IN Futsal": [
    "https://images.pexels.com/photos/14690051/pexels-photo-14690051.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/7207570/pexels-photo-7207570.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/35537217/pexels-photo-35537217.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Air Zoom Pegasus 41": [
    "https://images.pexels.com/photos/15475641/pexels-photo-15475641.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13525579/pexels-photo-13525579.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4065509/pexels-photo-4065509.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8644467/pexels-photo-8644467.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Ultraboost 22": [
    "https://images.pexels.com/photos/5930091/pexels-photo-5930091.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2446534/pexels-photo-2446534.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6150128/pexels-photo-6150128.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "New Balance Fresh Foam 1080v13": [
    "https://images.pexels.com/photos/12506036/pexels-photo-12506036.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1275690/pexels-photo-1275690.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12607452/pexels-photo-12607452.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/18380045/pexels-photo-18380045.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Mizuno Wave Rider 27": [
    "https://images.pexels.com/photos/29280163/pexels-photo-29280163.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5036937/pexels-photo-5036937.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/260044/pexels-photo-260044.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Puma Velocity Nitro 3": [
    "https://images.pexels.com/photos/12932260/pexels-photo-12932260.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/15036819/pexels-photo-15036819.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30558073/pexels-photo-30558073.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4727091/pexels-photo-4727091.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Under Armour HOVR Sonic 6": [
    "https://images.pexels.com/photos/10082285/pexels-photo-10082285.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/34277466/pexels-photo-34277466.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/38010742/pexels-photo-38010742.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/258453/pexels-photo-258453.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike LeBron NXXT Gen": [
    "https://images.pexels.com/photos/12879628/pexels-photo-12879628.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12306281/pexels-photo-12306281.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/9244882/pexels-photo-9244882.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13282073/pexels-photo-13282073.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Harden Vol. 8": [
    "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6150128/pexels-photo-6150128.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5930091/pexels-photo-5930091.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2446534/pexels-photo-2446534.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Air Force 1 Low Basketball": [
    "https://images.pexels.com/photos/12611637/pexels-photo-12611637.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12036893/pexels-photo-12036893.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/15592493/pexels-photo-15592493.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4313481/pexels-photo-4313481.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Under Armour Curry 12": [
    "https://images.pexels.com/photos/2362155/pexels-photo-2362155.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/33566132/pexels-photo-33566132.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8693800/pexels-photo-8693800.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6767329/pexels-photo-6767329.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Court Air Zoom Vapor Pro 2": [
    "https://images.pexels.com/photos/9241609/pexels-photo-9241609.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2043476/pexels-photo-2043476.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13580587/pexels-photo-13580587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13525579/pexels-photo-13525579.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Barricade 13": [
    "https://images.pexels.com/photos/5730950/pexels-photo-5730950.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3818834/pexels-photo-3818834.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/34399231/pexels-photo-34399231.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/33703050/pexels-photo-33703050.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Metcon 9": [
    "https://images.pexels.com/photos/5622272/pexels-photo-5622272.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1554099/pexels-photo-1554099.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4753991/pexels-photo-4753991.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4753997/pexels-photo-4753997.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Powerlift 5": [
    "https://images.pexels.com/photos/13106633/pexels-photo-13106633.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30707531/pexels-photo-30707531.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5707142/pexels-photo-5707142.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Puma Fuse 3.0": [
    "https://images.pexels.com/photos/7952236/pexels-photo-7952236.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/13442080/pexels-photo-13442080.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2057318/pexels-photo-2057318.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4727091/pexels-photo-4727091.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Under Armour TriBase Reign 6": [
    "https://images.pexels.com/photos/415261/pexels-photo-415261.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/258453/pexels-photo-258453.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30672400/pexels-photo-30672400.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/38010742/pexels-photo-38010742.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Air Max 90": [
    "https://images.pexels.com/photos/8859144/pexels-photo-8859144.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5196004/pexels-photo-5196004.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/9660924/pexels-photo-9660924.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/9940528/pexels-photo-9940528.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas Stan Smith": [
    "https://images.pexels.com/photos/3281608/pexels-photo-3281608.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30707531/pexels-photo-30707531.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6150128/pexels-photo-6150128.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "New Balance 574": [
    "https://images.pexels.com/photos/1275690/pexels-photo-1275690.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12607446/pexels-photo-12607446.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12607452/pexels-photo-12607452.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12284598/pexels-photo-12284598.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Puma Suede Classic XXI": [
    "https://images.pexels.com/photos/2474507/pexels-photo-2474507.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/9537461/pexels-photo-9537461.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2057318/pexels-photo-2057318.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30558073/pexels-photo-30558073.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Nike Dunk Low": [
    "https://images.pexels.com/photos/11429535/pexels-photo-11429535.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/16100364/pexels-photo-16100364.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/18202582/pexels-photo-18202582.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6050923/pexels-photo-6050923.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Adidas NMD R1": [
    "https://images.pexels.com/photos/11883278/pexels-photo-11883278.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/7501135/pexels-photo-7501135.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2446534/pexels-photo-2446534.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/7456354/pexels-photo-7456354.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Asics Calcetto WD 9 TF": [
    "https://images.pexels.com/photos/10923069/pexels-photo-10923069.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32962876/pexels-photo-32962876.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923067/pexels-photo-10923067.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Asics Destaque FF 2 TF": [
    "https://images.pexels.com/photos/16499006/pexels-photo-16499006.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/17955023/pexels-photo-17955023.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/29925640/pexels-photo-29925640.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10347804/pexels-photo-10347804.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Asics Toque 7 TF": [
    "https://images.pexels.com/photos/9519502/pexels-photo-9519502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5733516/pexels-photo-5733516.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/36429409/pexels-photo-36429409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "Asics Ultrezza Club TF": [
    "https://images.pexels.com/photos/32925319/pexels-photo-32925319.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/34717376/pexels-photo-34717376.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923065/pexels-photo-10923065.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "NMS Attack TF": [
    "https://images.pexels.com/photos/30490956/pexels-photo-30490956.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/9519502/pexels-photo-9519502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/36429409/pexels-photo-36429409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32941076/pexels-photo-32941076.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "NMS Capitan TF": [
    "https://images.pexels.com/photos/16499006/pexels-photo-16499006.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10347804/pexels-photo-10347804.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/29925640/pexels-photo-29925640.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/17955023/pexels-photo-17955023.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "NMS Maestri TF": [
    "https://images.pexels.com/photos/9519502/pexels-photo-9519502.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/36429409/pexels-photo-36429409.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/20575980/pexels-photo-20575980.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/30490956/pexels-photo-30490956.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "NMS Spider TF": [
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32962876/pexels-photo-32962876.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923069/pexels-photo-10923069.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "NMS Victory TF": [
    "https://images.pexels.com/photos/27299906/pexels-photo-27299906.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/19882423/pexels-photo-19882423.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923062/pexels-photo-10923062.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/274385/pexels-photo-274385.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "ZOCKER Inspire TF": [
    "https://images.pexels.com/photos/10923068/pexels-photo-10923068.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923070/pexels-photo-10923070.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923064/pexels-photo-10923064.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923065/pexels-photo-10923065.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  "ZOCKER Space TF": [
    "https://images.pexels.com/photos/12659348/pexels-photo-12659348.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923069/pexels-photo-10923069.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/10923067/pexels-photo-10923067.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/32797683/pexels-photo-32797683.jpeg?auto=compress&cs=tinysrgb&w=800"
  ]
};

// Fallback images của các môn thể thao (Pexels)
const CATEGORY_FALLBACKS = {
  "giay-bong-da-san-co-tu-nhien": "https://images.pexels.com/photos/27299906/pexels-photo-27299906.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-bong-da-san-co-nhan-tao": "https://images.pexels.com/photos/32925319/pexels-photo-32925319.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-futsal":                  "https://images.pexels.com/photos/14690051/pexels-photo-14690051.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-training":                "https://images.pexels.com/photos/4753991/pexels-photo-4753991.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-lifestyle":               "https://images.pexels.com/photos/12036893/pexels-photo-12036893.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-bong-da":                 "https://images.pexels.com/photos/10923070/pexels-photo-10923070.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-chay-bo":                 "https://images.pexels.com/photos/15475641/pexels-photo-15475641.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-bong-ro":                 "https://images.pexels.com/photos/12879628/pexels-photo-12879628.jpeg?auto=compress&cs=tinysrgb&w=800",
  "giay-tennis":                  "https://images.pexels.com/photos/9241609/pexels-photo-9241609.jpeg?auto=compress&cs=tinysrgb&w=800"
};

function pickProductImages(categorySlug, seedKey, count = 4) {
  if (PRODUCT_IMAGES[seedKey]) {
    const urls = PRODUCT_IMAGES[seedKey];
    const result = [...urls];
    // Pad array if not enough images
    while (result.length < count) {
      result.push(urls[result.length % urls.length]);
    }
    return result.slice(0, count);
  }

  // Fallback to category fallback
  const fallback = CATEGORY_FALLBACKS[categorySlug] || CATEGORY_FALLBACKS["giay-lifestyle"];
  return Array.from({ length: count }, () => fallback);
}

function pickCategoryImage(categorySlug) {
  return CATEGORY_FALLBACKS[categorySlug] || CATEGORY_FALLBACKS["giay-lifestyle"];
}

module.exports = {
  PRODUCT_IMAGES,
  CATEGORY_FALLBACKS,
  pickProductImages,
  pickCategoryImage,
};
