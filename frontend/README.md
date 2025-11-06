# Food Delivery App - Frontend

Bu proje, Food Delivery uygulamasının React + TypeScript frontend kısmıdır. Mikroservis mimarisindeki backend ile entegre çalışır.

## Teknolojiler

- **React 18** - UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool ve development server
- **Tailwind CSS** - Styling
- **React Query** - Server state management
- **Auth0** - Kimlik doğrulama
- **React Router** - Routing
- **Sonner** - Toast notifications
- **Shadcn/ui** - UI components

## Kurulum

### Önkoşullar
- Node.js 18+
- Backend servislerinin çalışır durumda olması

### 1. Bağımlılıkları yükleyin
```bash
npm install
```

### 2. Environment değişkenlerini ayarlayın
`.env` dosyası oluşturun:
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:7000

# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:3000
```

### 3. Development modunda çalıştırın
```bash
npm run dev
```

### 4. Production build
```bash
npm run build
npm run preview
```

## API Entegrasyonu

Frontend, aşağıdaki mikroservislerle entegre çalışır:

### API Gateway (Port: 7000)
- Tüm API istekleri API Gateway üzerinden yapılır
- Load balancing ve error handling sağlar

### Auth Service (Port: 3006)
- Kimlik doğrulama ve yetkilendirme
- JWT token yönetimi
- Kullanıcı profili işlemleri

### User Service (Port: 3001)
- Kullanıcı bilgileri yönetimi
- Adres bilgileri

### Restaurant Service (Port: 3002)
- Restoran yönetimi
- Menü işlemleri
- Restoran arama ve filtreleme

### Order Service (Port: 3003)
- Sipariş işleme
- Ödeme entegrasyonu (Stripe)
- Sipariş durumu takibi

### Driver Service (Port: 3004)
- Sürücü yönetimi
- Sürücü arama ve filtreleme

## API Dosyaları

- `src/api/AuthApi.tsx` - Auth Service entegrasyonu
- `src/api/UserApi.tsx` - User Service entegrasyonu
- `src/api/RestaurantApi.tsx` - Restaurant Service entegrasyonu
- `src/api/OrderApi.tsx` - Order Service entegrasyonu
- `src/api/DriverApi.tsx` - Driver Service entegrasyonu
- `src/api/SearchRestaurantApi.tsx` - Restoran arama API'si

## Özellikler

### Kullanıcı Yönetimi
- Auth0 ile güvenli giriş/çıkış
- Kullanıcı profili yönetimi
- Rol tabanlı yetkilendirme (user, admin, driver, restaurant)

### Restoran İşlemleri
- Restoran arama ve filtreleme
- Menü görüntüleme
- Restoran sahibi paneli
- Sipariş yönetimi

### Sipariş İşlemleri
- Sepet yönetimi
- Stripe ile güvenli ödeme
- Sipariş durumu takibi
- Sipariş geçmişi

### Sürücü İşlemleri
- Sürücü arama ve filtreleme
- Sürücü profili yönetimi
- Sürücü detayları görüntüleme

## Geliştirme Notları

### Environment Variables
- `VITE_API_BASE_URL`: API Gateway URL'i (default: http://localhost:7000)
- `VITE_AUTH0_DOMAIN`: Auth0 domain
- `VITE_AUTH0_CLIENT_ID`: Auth0 client ID
- `VITE_AUTH0_CALLBACK_URL`: Auth0 callback URL

### API Error Handling
- Tüm API çağrıları error handling içerir
- Toast notifications ile kullanıcı bilgilendirmesi
- React Query ile otomatik retry ve caching

### Authentication
- Auth0 ile JWT token tabanlı kimlik doğrulama
- Protected routes için middleware
- Token refresh otomatik olarak yapılır

## Docker ile Çalıştırma

Backend ile birlikte çalıştırmak için:

```bash
# Backend'i başlatın
cd ../backend
docker-compose up -d

# Frontend'i başlatın
npm run dev
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
