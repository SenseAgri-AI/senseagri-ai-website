import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, BarChart3, Droplets, Satellite, TrendingUp, Shield, Sparkles } from 'lucide-react'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <div>
      <SEO title="Home" />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_55%)]"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 md:py-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 ring-1 ring-white/20 text-sm font-medium text-primary-50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              AI-driven precision agriculture
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Smart Agriculture Powered by AI
            </h1>
            <p className="text-lg md:text-xl mb-10 text-primary-50/90 leading-relaxed max-w-2xl">
              SenseAgri delivers cutting-edge AI solutions for modern farming. Optimize yields, reduce waste, and farm smarter with real-time insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-primary-700 font-semibold rounded-lg shadow-sm hover:bg-primary-50 hover:shadow-md transition-all">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary-800/60 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors border border-primary-400/40">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Why SenseAgri
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4 tracking-tight">
              Why Choose SenseAgri?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our AI-powered platform transforms traditional farming into precision agriculture.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Satellite, title: 'Satellite Monitoring', desc: 'Real-time crop monitoring using advanced satellite imagery and AI analysis.' },
              { icon: Droplets, title: 'Smart Irrigation', desc: 'Optimize water usage with intelligent irrigation recommendations.' },
              { icon: BarChart3, title: 'Yield Prediction', desc: 'Accurate harvest forecasts powered by machine learning models.' },
              { icon: Leaf, title: 'Crop Health', desc: 'Early detection of diseases and pests before they spread.' },
              { icon: TrendingUp, title: 'Market Insights', desc: 'Data-driven recommendations to maximize your profits.' },
              { icon: Shield, title: 'Risk Management', desc: 'Proactive alerts for weather and environmental risks.' },
            ].map((feature, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary-100 transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-xl mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Trusted by farmers everywhere
            </h2>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              Real results from farms putting SenseAgri to work every day.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { value: '500+', label: 'Farms Served' },
              { value: '30%', label: 'Yield Increase' },
              { value: '40%', label: 'Water Saved' },
              { value: '24/7', label: 'Monitoring' },
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 tracking-tight">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-28 bg-gradient-to-br from-primary-700 to-primary-800 text-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-lg mb-10 text-primary-50/90 leading-relaxed">
            Join hundreds of farmers already using SenseAgri to grow smarter.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-lg shadow-sm hover:bg-primary-50 hover:shadow-md transition-all">
            Start Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
