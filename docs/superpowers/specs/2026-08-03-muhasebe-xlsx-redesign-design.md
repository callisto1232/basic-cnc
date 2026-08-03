# Muhasebe XLSX düzenleme tasarımı

## Özet

`docs/Muhasebe/cnc muhasebe .xlsx` dosyası, mevcut Google Sheets kopyasının ötesine geçerek daha düzenli, daha kompakt ve profesyonel bir muhasebe çalışma kitabına dönüştürülecek. Ana hedef, veriyi bozmadan kayıtları gerçek bir muhasebe tablosu mantığına yaklaştırmak, dağınık alanları mantıklı sütunlara yerleştirmek, açıklamaları okunaklı ama kısa hale getirmek ve en altta net bir finans özeti sunmaktır.

Bu çalışma tek sayfalı kalacak. Yeni yapı, kullanıcıya hızlı okuma, toplamları tek bakışta görme ve ham kayıtları bozmadan daha temiz izleme imkanı verecek.

## Hedefler

- Dosyanın çalışır durumunu korumak.
- İşleme başlamadan önce dosyanın birebir yedeğini almak.
- Mevcut verileri karıştırmadan daha profesyonel bir muhasebe düzeni kurmak.
- Açıklama alanlarını anlamı koruyarak kısaltmak.
- Açıkça yanlış yerde duran verileri uygun sütunlara taşımak.
- Belirsiz verileri yok etmeden korumak.
- En altta `Toplam Gider`, `Toplam Gelir`, `Net Kasa` benzeri net bir toplam bölümü oluşturmak.
- Çalışma sayfasını daha kompakt hale getirmek: gereksiz genişlik ve aşırı uzun satırları azaltmak.

## Kapsam dışı

- Kullanıcının vermediği yeni finansal veri üretmek.
- Belirsiz kayıtları uydurarak kesin veriymiş gibi yeniden yazmak.
- Dosyayı çok sayfalı rapor yapısına çevirmek.
- Ham kayıtları silmek veya geri dönüşü zor bir şekilde kaybetmek.

## Mevcut durum

Çalışma kitabında tek sayfa vardır: `Sayfa1`.

Başlıca sorunlar:

- `Açıklama` sütununda az sayıda ama gereğinden uzun metin bulunuyor.
- Çok sayıda satırda temel alanlar boşken açıklama kısmında veri var.
- Sağ tarafta başlıksız alanlarda birkaç dağınık veri bulunuyor.
- Gelir ve gider akışı görsel olarak net değil.
- Toplamlar sayfa sonunda düzenli bir muhasebe özeti halinde yer almıyor.

## Hedef tablo yapısı

Tek sayfa korunur, ancak sütun düzeni muhasebe okumayı kolaylaştıracak şekilde normalize edilir.

Önerilen kolon mantığı:

- `Kişi`
- `Tarih`
- `Tür`
- `Ürün / Hareket`
- `Adet`
- `Birim Fiyat`
- `Tutar`
- `Açıklama`
- `Link`
- `Durum / Not`

## Veri işleme kuralları

### Açıklama optimizasyonu

Açıklamalar anlam bozulmadan kısaltılacaktır.

Uygulama ilkeleri:

- Gereksiz tekrarlar kaldırılır.
- Çok uzun ifadeler daha kısa, aynı anlamı taşıyan doğal Türkçe ile yeniden yazılır.
- Teknik ürün isimleri korunur.
- Miktar, ölçü, kişi, ödeme veya kaynak bilgisi varsa kaybolmaz.
- Açıklama ürün alanına daha uygun görünüyorsa, ürün alanına taşınır; açıklama daha kısa bir destek notuna dönüşür.

Örnek dönüşüm mantığı:

- `Web sitesi için 2 yıllık domain alım işlemi` → `2 yıllık domain alımı`
- `8 adet bakır dirsek, 2 uç. soğutucu sistem için` → `Soğutma için 8 dirsek, 2 uç`

### Agresif yerleştirme

Kullanıcı tercihi doğrultusunda agresif yerleştirme uygulanır.

Bu şu anlama gelir:

- Eğer `Ürün` boş ama `Açıklama` açıkça bir ürün ya da hareket adı veriyorsa, uygun sütuna taşınır.
- Eğer sağ taraftaki başıboş hücreler açıkça not, kişi borcu veya durum bilgisi içeriyorsa, ilgili satırdaki `Durum / Not` alanına alınır.
- Eğer bir kayıt gelir niteliği taşıyorsa `Tür = Gelir`; gider niteliği taşıyorsa `Tür = Gider` olarak işaretlenir.
- Eğer bağlam güçlü değilse veri olduğu yerde korunur veya not alanında muhafaza edilir; sessizce silinmez.

### Veri bütünlüğü

- Mevcut sayısal değerler değiştirilmez.
- Formül üreten alanlar formülle korunur.
- Tarih ve kişi verileri bozulmaz.
- Link alanındaki veri varsa saklanır.

## Görsel düzen

### Kompaktlık

- Satır yükseklikleri içerik kadar büyütülür; aşırı yüksek satırlar kaldırılır.
- `Açıklama` sütunu kontrollü genişlikte tutulur ve satır kaydırma kullanılır.
- Sayfa gereksiz yatay taşmayı azaltacak şekilde yeniden genişliklendirilir.

### Stil

- Başlık satırı belirgin ve temiz tutulur.
- Veri satırlarında hafif zebra düzeni uygulanır veya mevcut stil korunuyorsa buna yakın bir sade görünüm korunur.
- Para alanları tutarlı biçimde para formatında gösterilir.
- Toplam alanı veri tablosundan görsel olarak ayrılır.

## Toplam bölümü

Sayfanın en altında açık bir özet bloğu bulunur.

Bu bölüm en az şu alanları içerecektir:

- `Toplam Gider`
- `Toplam Gelir`
- `Net Kasa`

Gerekirse mevcut veride anlamlıysa ek ara satırlar da eklenebilir:

- `Kişi Bazlı Bakiye`
- `Açık Borç / Kapandı`

Hesap mantığı:

- `Toplam Gider`: negatif tutarların mutlak toplamı veya gider toplamı
- `Toplam Gelir`: pozitif tutarların toplamı
- `Net Kasa`: gelirler eksi giderler

Bu hesaplar Excel formülleriyle yapılır; Python içinde hesaplanıp sabit değer olarak yazılmaz.

## Yedekleme ve güvenlik

- Düzenleme öncesi mevcut dosyanın birebir kopyası alınır.
- Yedek aynı klasörde açık adlandırma ile saklanır.
- İşlem tamamlandıktan sonra asıl dosya düzenlenmiş sürüm olarak kaydedilir.

## Doğrulama

İşlem sonunda şu kontroller yapılır:

- Dosya açılabiliyor mu
- Sayfa yapısı sağlam mı
- Formüller bozulmuş mu
- Toplam bloğu doğru hücrelere bağlı mı
- Taşınan dağınık veriler kaybolmuş mu
- Belirsiz veriler korunmuş mu

## Uygulama özeti

Uygulama sırası şu şekilde olacaktır:

1. Hedef dosyanın yedeğini al
2. Mevcut sayfayı analiz et
3. Yeni kolon mantığını aynı sayfa içinde uygula
4. Açıklamaları kısalt ve dağıt
5. Dağınık verileri uygun alanlara taşı
6. Görsel sıkılığı iyileştir
7. En alta toplam bloğunu ekle
8. Formül ve dosya doğrulamasını yap
