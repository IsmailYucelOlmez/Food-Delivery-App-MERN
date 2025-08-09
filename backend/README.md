# Food Delivery App - Microservices Architecture

Bu proje, monolitik bir food delivery uygulamasının mikroservis mimarisine dönüştürülmesi ile oluşturulmuştur.

## Mikroservis Mimarisi

Uygulama şu mikroservislere bölünmüştür:

### 1. **User Service** (Port: 3001)
- Kullanıcı kimlik doğrulama ve yönetimi
- Kullanıcı profili işlemleri
- Auth0 entegrasyonu

### 2. **Restaurant Service** (Port: 3002)
- Restoran yönetimi ve menü işlemleri
- Restoran arama ve filtreleme
- Cloudinary entegrasyonu (resim yükleme)

### 3. **Order Service** (Port: 3003)
- Sipariş işleme ve ödeme yönetimi
- Stripe entegrasyonu
- Sipariş durumu takibi

### 4. **Driver Service** (Port: 3004)
- Sürücü yönetimi ve teslimat işlemleri
- Sürücü arama ve filtreleme
- Sürücü profili yönetimi

### 5. **API Gateway** (Port: 7000)
- İstekleri uygun mikroservislere yönlendirme
- Load balancing
- Error handling

## Kurulum

### Önkoşullar
- Node.js 18+
- MongoDB
- Docker (opsiyonel)

### 1. Tüm servislerin bağımlılıklarını yükleyin
```bash
npm run install:all
```

### 2. Environment dosyalarını oluşturun
Her servis klasöründe `env.example` dosyasını `.env` olarak kopyalayın ve gerekli değerleri doldurun.

### 3. Development modunda çalıştırın
```bash
npm run dev
```

### 4. Production modunda çalıştırın
```bash
npm run build:all
npm run start:all
```

## Docker ile Çalıştırma

### Ön Gereksinimler
- Docker
- Docker Compose

### Environment Dosyası
Ana dizinde `.env` dosyası oluşturun:
```bash
cp env.example .env
# .env dosyasını gerekli değerlerle doldurun
```

### Docker Komutları
```bash
# Tüm servisleri build edin
docker-compose build

# Servisleri başlatın (detached mode)
docker-compose up -d

# Servisleri başlatın (log'ları görmek için)
docker-compose up

# Servisleri durdurun
docker-compose down

# Servisleri yeniden build edin ve başlatın
docker-compose up --build

# Belirli bir servisi yeniden başlatın
docker-compose restart user-service

# Servislerin durumunu kontrol edin
docker-compose ps

# Servislerin log'larını görün
docker-compose logs -f
```

### NPM Scripts ile Docker
```bash
# Package.json'daki script'ler
npm run docker:build    # docker-compose build
npm run docker:up       # docker-compose up -d
npm run docker:down     # docker-compose down
```

## API Endpoints

### User Service
- `POST /api/my/user` - Kullanıcı oluştur
- `GET /api/my/user` - Mevcut kullanıcıyı getir
- `PUT /api/my/user` - Kullanıcı güncelle

### Restaurant Service
- `POST /api/my/restaurant` - Restoran oluştur
- `GET /api/my/restaurant` - Restoranı getir
- `PUT /api/my/restaurant` - Restoran güncelle
- `GET /api/restaurant/search/:city` - Restoran ara
- `GET /api/restaurant/:restaurantId` - Restoran detayı

### Order Service
- `GET /api/order` - Siparişlerimi getir
- `POST /api/order/checkout/create-checkout-session` - Ödeme oturumu oluştur
- `POST /api/order/checkout/webhook` - Stripe webhook
- `GET /api/order/restaurant/:restaurantId` - Restoran siparişleri
- `PATCH /api/order/:orderId/status` - Sipariş durumu güncelle

### Driver Service
- `GET /api/driver/search` - Sürücü ara
- `GET /api/driver/profile` - Sürücü profili
- `POST /api/driver` - Sürücü oluştur
- `PUT /api/driver` - Sürücü güncelle
- `GET /api/driver/:id` - Sürücü detayı

## Teknoloji Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Database**: MongoDB
- **Authentication**: Auth0
- **Payment**: Stripe
- **File Storage**: Cloudinary
- **API Gateway**: Express + http-proxy-middleware
- **Containerization**: Docker

## Mikroservis Avantajları

1. **Ölçeklenebilirlik**: Her servis bağımsız olarak ölçeklendirilebilir
2. **Teknoloji Çeşitliliği**: Her servis farklı teknolojiler kullanabilir
3. **Hatanın İzolasyonu**: Bir servisteki hata diğerlerini etkilemez
4. **Bağımsız Deployment**: Servisler ayrı ayrı deploy edilebilir
5. **Takım Bağımsızlığı**: Farklı takımlar farklı servisler üzerinde çalışabilir

## Monitoring ve Health Checks

API Gateway health check endpoint'i:
```
GET /health
```

Her servisin durumunu kontrol etmek için yukarıdaki endpoint'i kullanabilirsiniz.

## Geliştirme Notları

- Her mikroservis kendi veritabanı bağlantısını yönetir
- Authentication, JWT token'lar ile sağlanır
- Servisler arasında iletişim HTTP REST API'ler ile yapılır
- Error handling ve logging her serviste ayrı ayrı yapılandırılmıştır
