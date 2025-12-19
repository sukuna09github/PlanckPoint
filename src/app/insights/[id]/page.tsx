

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockResearchData } from '@/lib/constants';

const InsightDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [insight, setInsight] = React.useState<(typeof mockResearchData[0]) | null>(null);
  const [relatedInsights, setRelatedInsights] = React.useState<(typeof mockResearchData)>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchInsight = () => {
      if (!id) return;
      
      try {
        const insightData = mockResearchData.find(item => item._id === id);
        
        if (insightData) {
          setInsight(insightData);
          
          // Get related insights (exclude current one)
          const related = mockResearchData
            .filter(item => item._id !== id)
            .slice(0, 3);
          setRelatedInsights(related);
        } else {
          setInsight(null);
        }
      } catch (error) {
        console.error('Error fetching insight:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [id]);

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getReadingTime = (content?: string) => {
    if(!content) return '5 min read';
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: insight?.title,
          text: insight?.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-body">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-headline font-bold text-primary mb-4">Insight Not Found</h1>
          <p className="text-muted-foreground font-body mb-8">The insight you're looking for doesn't exist.</p>
          <Button asChild className="bg-primary hover:bg-secondary text-primary-foreground">
            <Link href="/insights">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const fullContent = `In an era defined by digital transformation, the imperative for businesses to adapt has never been more critical. The evolution of remote work culture, a phenomenon accelerated by recent global events, stands at the forefront of this change. Our comprehensive analysis delves into how remote and hybrid work models have reshaped organizational culture, employee engagement, and overall productivity over the past three years. The findings reveal a complex landscape of opportunities and challenges. While flexibility and autonomy have emerged as significant drivers of job satisfaction, maintaining a cohesive corporate culture and fostering spontaneous collaboration requires deliberate and innovative strategies. Successful organizations are those that leverage technology not merely as a substitute for physical presence, but as a tool to enhance connection, streamline workflows, and empower employees.

The integration of Artificial Intelligence into enterprise systems represents another pivotal trend. Our study on AI implementation strategies highlights that success is not solely dependent on technological sophistication, but on a human-centric approach. The most effective AI integrations are those that augment human capabilities, automate repetitive tasks, and provide actionable insights for decision-making. From optimizing supply chains to personalizing customer experiences, AI is unlocking new frontiers of efficiency and value creation. However, this journey is not without its hurdles. Ethical considerations, data privacy, and the need for a skilled workforce to manage and interpret AI-driven analytics are paramount. The report provides a roadmap for navigating these challenges, ensuring that AI adoption is both responsible and impactful.

The correlation between employee wellness and productivity is another area of our focus. Data-driven insights from our research indicate a strong positive link between comprehensive wellness programs and key performance indicators. Organizations that invest in the physical, mental, and financial well-being of their employees report higher levels of engagement, lower rates of burnout, and increased innovation. This underscores a fundamental shift in the employer-employee relationship, where mutual well-being is recognized as a cornerstone of sustainable success. The study offers a framework for designing and measuring the ROI of wellness initiatives, making a compelling case for their strategic importance.

As teams become more distributed, the challenge of maintaining robust cybersecurity protocols has intensified. Our research outlines best practices for securing data and systems in a decentralized work environment. This includes a multi-layered approach that combines advanced threat detection, regular security training, and clear communication channels. The digital skills gap also remains a significant concern for many organizations. Our 2024 analysis identifies the most in-demand digital competencies and provides recommendations for targeted training and development programs to bridge this gap. Furthermore, our work on human-centered design emphasizes its critical role in creating technology that is not only functional but also intuitive and enjoyable to use.

Looking ahead, the landscape of work and technology continues to evolve at a rapid pace. Emerging technologies such as digital twins, which create virtual models of physical assets, are revolutionizing industries from manufacturing to healthcare. The rollout of 5G networks is set to unlock the full potential of the Internet of Things, enabling a new era of connected devices and services. However, these advancements also bring new ethical dilemmas, such as those surrounding autonomous systems and data privacy. Navigating this complex future requires a deep understanding of both the technological possibilities and their human implications. At Planckpoint, we are committed to providing the research and insights necessary to lead with confidence in this ever-changing world.
`;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-white border-b border-foreground/10">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:bg-primary/10 shrink-0"
            >
              <Link href="/research">
                <ArrowLeft className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Back to Research</span>
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => alert("PDF download functionality to be implemented.")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Download PDF</span>
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Share2 className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-sm text-muted-foreground font-medium">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(insight.publicationDate)}</span>
              </div>
              
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{getReadingTime(fullContent)}</span>
                </div>
              
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{insight.category}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-headline font-normal text-primary mb-8 leading-tight">
              {insight.title}
            </h1>
            
            <p className="text-xl md:text-2xl font-body text-foreground leading-relaxed max-w-3xl mx-auto font-normal">
              {insight.summary}
            </p>
          </motion.div>

          {insight.mainImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="overflow-hidden shadow-xl mb-12"
            >
              <Image
                src={insight.mainImage}
                alt={insight.title || 'Insight'}
                className="w-full h-auto md:h-96 object-cover"
                width={800}
                height={400}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="p-8 md:p-12">
                
                  <div className="prose prose-lg max-w-none">
                    <div className="text-lg font-body text-white/90 leading-relaxed space-y-6 font-normal">
                      {fullContent.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-6">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related Insights */}
      {relatedInsights.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-headline font-normal text-primary mb-6">
                Related Insights
              </h2>
              <p className="text-lg font-body text-foreground max-w-2xl mx-auto">
                Continue exploring our research with these related articles and insights.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedInsights.map((relatedInsight, index) => (
                <motion.div
                  key={relatedInsight._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-2 bg-background border-0 shadow-sm group">
                    <Link href={`/insights/${relatedInsight._id}`} className="block h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {relatedInsight.mainImage && (
                          <div className="overflow-hidden">
                            <Image
                              src={relatedInsight.mainImage}
                              alt={relatedInsight.title || 'Related insight'}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                              height={192}
                            />
                          </div>
                        )}
                        
                        <div className="p-8 flex-1 flex flex-col">
                          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(relatedInsight.publicationDate)}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-headline font-semibold text-primary mb-4 group-hover:text-secondary transition-colors duration-300 flex-shrink-0">
                            {relatedInsight.title}
                          </h3>
                          
                          <p className="text-base font-body text-foreground mb-6 flex-1 line-clamp-3">
                            {relatedInsight.summary}
                          </p>

                          <div className="mt-auto">
                            <span                            
                              className="text-accent hover:underline font-semibold"
                            >
                              Read More
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-secondary text-primary-foreground px-8 py-3"
              >
                <Link href="/research">
                  View All Research
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-headline font-normal text-primary-foreground mb-6">
              Want to Learn More?
            </h2>
            <p className="text-lg font-body text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover how our research can be applied to your organization's specific challenges 
              and opportunities in human-technology interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20"
              >
                <Link href="/contact">
                  Contact Our Experts
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsightDetailPage;
