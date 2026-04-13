import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, size } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Stability AI API key not configured' }, { status: 500 });
    }

    // Set up image dimensions based on aspect ratio (using allowed XL dimensions)
    let width = 1024, height = 1024;
    if (size === '16:9') { width = 1344; height = 768; }
    if (size === '9:16') { width = 768; height = 1344; }

    // Use Stable Diffusion XL model
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: height,
        width: width,
        samples: 1,
        steps: 30,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Stability AI API Error:', data);
      
      // Handle specific Stability AI errors
      if (response.status === 401) {
        return NextResponse.json(
          { 
            error: 'Invalid API key. Please check your Stability AI API key configuration.',
            isBillingError: false,
            needsNewKey: true
          },
          { status: 401 }
        );
      }
      
      if (response.status === 402 || response.status === 429) {
        return NextResponse.json(
          { 
            error: 'API limit reached. Please check your Stability AI account billing or add credits.',
            isBillingError: true,
            needsNewKey: false
          },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: data.message || 'Failed to generate image' },
        { status: response.status }
      );
    }

    if (!data.artifacts || data.artifacts.length === 0) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      );
    }

    // Convert base64 to image URL
    const base64Image = data.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      revisedPrompt: prompt 
    });

  } catch (error) {
    console.error('Stability AI API Error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
