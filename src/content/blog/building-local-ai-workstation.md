---
title: 'Building a Local AI Workstation - Part 1: Hardware, Models and Architecture'
description: 'An overview of my workstation, AI, and my software choices.'
pubDate: 'Oct 11 2026'
heroImage: '../../assets/AI_Workstation.png'
tooltip: 'This image is a real photo of my PC, edited using generative AI'
caption: 'Building a local AI workstation for machine learning and deep learning development'
---
### Note this article is a work in progress! 

## Building a Local AI Workstation

Ai is quickly evolving and becoming a common tool used by millions of people across the world. It is becoming necessary to become familiar with it to stay up to date on current trends as a dev, and remain a competitive programmer. 


## Why Build a Local AI Workstation?

I chose to build a local AI workstation, because I am interested in learning more about how AI works, how I can creatively use it, and how it can enhance my workflows. A subscription to a cloud AI provider such as Chat GPT by Open AI, or Claude by Anthropic would certainly be much more powerful than what is possible to run at home. But running AI at home does have several advantages.

**Data Privacy and Security**: You have full control over your data. No data is sent to commercial AI providers, and any web interactions the AI commits are gated by my security policies. 

**Cost Efficiency**: Cloud AI can be fairly expensive depending on how much use you make of it. Once you set up the hardware for your local AI, you never have to pay usage costs.

**Fine Tuning**: You can fine tune your model on whatever data you want, to ensure it behaves more in line with your specific needs. 

**It's Fun!**: Creating a local AI workstation is a fun project, and you'll learn a lot about AI. 

## Essential Hardware Components

Currently we have small toy AI models that can run on even the weakest computers. We have models like TinyLLama that can run on PCs with as little as 2GB of RAM. While larger models might be exceptionally computataionally expensive and demand hundreds of gigabytes of VRAM or RAM. 

Generally we can run models in one of two ways. We can load the entire model into RAM and run the computations on the CPU. The hardware to do this is cheaper, but this approach is much slower than the alternative. The alternative is that we have a PC with enough VRAM that we can load the entire model into VRAM. The hardware to do this is much more expensive, but this approach is also much more performant. 

While you can use any PC for playing with AI, personally I think 12GB of VRAM is the point where local AI can move from a toy, to something actually useful. 

My personal hardware setup is as follows

- **CPU**: AMD 7800X3d
- **GPU**: AMD Radeon 7900XTX with 24GB of VRAM
- **RAM**: 64GB of DDR5 RAM
- **Storage**: 3TB of high speed NVME storage

The most important aspect of my setup is the GPU with 24GB of VRAM. Nvidia is a common choice for at home AI setups as Nvidia supports CUDA, a high performance parallel computing platform often used for AI acceleration. However, Nvidia graphics cards are 
currently much more expensive than Radeon graphics cards, and Radeon cards have recently been getting much more mature software support for running local AIs.

If you're building an at home AI lab, just try to get a GPU with as much VRAM as you can possibly afford. Common choices include 

- **AMD Radeon 7900XTX (24GB of VRAM)**
- **Nvidia RTX 3060 (12GB of VRAM)**
- **Nvidia RTX 3090 (24GB of VRAM)**
- **Nvidia RTX 4090 (24GB of VRAM)**
- **Nvidia RTX 5090 (32GB of VRAM)**


##

There are many other graphics cards you can purchase that are suitable.

## Understanding VRAM Limitations

I've already mentioned how important VRAM is for running local AI. But here I'll go into more detail about the reasons why. AI model performance is limited by VRAM in the following ways.

1. **Model Paramaters:** The number of paramaters, typically measured in billions, that make up the nueral network.
2. **Model Quantitization:** The precision we use to represent these parameters. Think of the different levels of precision we typically use when doing computer based mathematics. Think floating point math, integer math, etc.
3. **Context Window:** How much information the model can use in memory while considering a query.
4. **Key-Value (KV) Cache:** Cache used to store previously computed values in memory. Reducing inference complexity at the expense of memory. 
5. **Total VRAM Allocation:** The total amount of  VRAM used by your system during all of this can't exceed the VRAM of your GPU. This means the combined memory requirements of all previous concepts plus the VRAM used by your system for processing the GUI, can't exceed 24GB in my case.

### Large Language Models

Before we dive too deeply into the technical specifics, I'd like to introduce some basics about these AI models we're working with. I won't spend time discussing the basics of classic machine learning. This is a bit beyond the scope of what I wish to discuss here, but is very easy to learn more about. A great source to look at would be [Google's Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course). This course covers the very basics of Machine Learning in an approachable and fun way.

What I would like to discuss, is Large Language Models (LLMs). LLMs are a form of advanced deep learning trained on human natural language in order to understand human language, and other human level tasks <sup><a href="https://www.ibm.com/think/topics/large-language-models">[1]</a></sup>. Deep Learning is a subset of machine learning that uses many layers (>4) of neural networks in a large interconnected system of "neurons" <sup><a href="https://www.ibm.com/think/topics/deep-learning">[2]</a></sup>. Neural Networks then are a large network of "neurons" put together. These neurons are simply each a mathematical function that transforms an input. The input is passed through many of these interconnected neurons to calculate the output <sup><a href="https://www.ibm.com/think/topics/neural-networks">[3]</a></sup>. It is fascinating stuff, especially if you're a fan of linear algebra.

LLMs specifically are generally built with a "transformer" neural network architecture. This architecture was first published in 2017 by Google in their paper [Attention is All You Need](https://arxiv.org/abs/1706.03762).

Then put together simply LLMs are machine learning models trained on tremendous amounts of data (GPT 6 was trained on over 1 trillion tokens<sup>1</sup> <sup><a href="https://cdn.openai.com/pdf/gpt-6-astra-eu-ai-act-public-summary-of-training-content.pdf">[4]</a></sup>). The model takes an input text, and computes a likely output based on the input. At first glance, it seems preposterous that the likely outputs could be anything more than correct sounding gibberish, and in fact you may remember when early LLMs frequently hallucinated, but it turns out when trained on the entire sum of human knowledge, the training data itself seems to impart reasoning ability.

<sup>1</sup> I mentioned tokens instead of words here. We say that LLMs compute their inputs and outputs as tokens, and not words, because the inputs and outputs could be processed as words, characters, or character sets. See [here](https://learn.microsoft.com/en-us/dotnet/ai/conceptual/understanding-tokens) for more info. 

### Model Parameters

Large language models are often referred to by the number of weights or parameters. These parameters are learned during the creation and training of the models. These weights determine how the inference pass processes inputs and generates an appropriate response. Parameters are the internal variables of any machine learning network, while weights are specifically the numerical parameters within a neural network that are used in the mathematical calculations that transform the input to the output <sup><a href="https://hai.stanford.edu/ai-definitions/what-are-parameters">[5]</a></sup> <sup><a href="https://hai.stanford.edu/ai-definitions/what-are-parameters">[6]</a></sup>

Common weights include 
| Model Size | Parameters | Relative Size 
|:----------:|-----------:|:--------------|
| **3B**     | 3 billion  | █ |
| **7B**     | 7 billion  | ██ |
| **13B**    | 13 billion | ████ |
| **30B**    | 30 billion | ██████████ |
| **70B**    | 70 billion | ███████████████████████ 

As the model weights increase, we drastically increase the VRAM demand. Models with a higher number of parameters are generally more intelligent and performant. However, with advances in architecture and efficiency, we are seeing current generation smaller weight models outperform older large weight models. However, all else being equal a larger weight model will almost certainly outperform a smaller weight model. 

The amount of VRAM used by storing the model weights in memory can be calculated in the following way. 

$$
\text{Model Size (Bytes)} =
\text{Number of Parameters}
\times
\text{Bytes per Parameter}
$$

For example, running a 70B paramater model, with floating point 16 precision (FP16 requires 2 bytes per number) would yield the following memory requirements.
$$
70 \times 10^9 \times 2 = 140 \times 10^9 \text{ bytes} = 140 \text{ Gigabytes}
$$

This is far beyond the 24GB of VRAM I have, and even beyond what is possible if we want to offload the model into RAM. However, the good news is that Quantization can be used to reduce memory requirements.
It is also important to note here, that this is merely what is needed to store the model weights, other aspects of running the model could push our VRAM usage even higher. 

### Quantization 

Quantization is how we can reduce the memory requirements for running a given model. Generally during training a model is trained with with very high precision numbers. For example the weights could be calculated with Floating Point 32 accuracy. However, when using a trained model, most of the capability can be retained even 
when representing the weights with lower precision numbers, while drastically saving on the memory requirements. For that same 70B parameter model we discussed, here is how different quantizations of weights could affect the memory requirements. 

| Precision | Bits per Parameter | Approximate Weight Storage |
|:----------|-------------------:|---------------------------:|
| FP32      | 32                 | 280 GB                     |
| FP16/BF16 | 16                 | 140 GB                     |
| INT8      | 8                  | 70 GB                      |
| INT4      | 4                  | 35 GB                      |
| INT3      | 3                  | 26.25 GB                    |
| INT2      | 2                  | 17.5 GB                      |
 

For my first model, I chose **Qwen3-Coder-30B-A3B-Instruct in the Q4_K_M format**. Q4_K_M is a 4 bit precision format supported by llamma.cpp


### Key-Value Cache 

Key-Value Cache (KV Cache) is the cache that stores the results of previous computations when computing the output of a transformer model. This greatly reduces the computational complexity because to compute N+1 tokens, we need to compute all the previous tokens from 0 to N. If we did not store these results in a cache, we would have to recalculate all the previous tokens each time we calculated a new token. However, an obvious downside of this is that the KV Cache can greatly increase the memory cost of running the model <sup>[6](https://huggingface.co/docs/transformers/cache_explanation?utm_source=chatgpt.com)</sup>.This generally reduces the quadratic cost of attention computation to a linear cost. It's important to note here that this memory cost can be enough to have a significant impact on the performance of a model. Increasing this context memory could push a models memory requirement to high to fit in VRAM. So tuning an appropriate sized context window important. 

### Mixture of Experts

The initial Qwen model I chose is actually a Mixture of Experts (MoE) model. This is an exciting class of model that performs the inference (thinking) much quicker than non MoE models. Traditional neural networks send every token through the same neural network. However with an MoE, the model contains multiple specialized neural networks that tokens are intelligently routed through. This allows the model to perform inference quicker, as we don't have to activate every neural network in the layer for every token, merely we need to activate the relevant layers. For example Qwen3-Coder-30B-A3B has 30 billion parameters, but only activates 3 billion per token. It is important to note that all the model weights still need to be loaded into memory, the MoE merely improves the speed of inference, it does not reduce the memory required. See Hugging Face's [article](https://huggingface.co/blog/moe?utm_source=chatgpt.com#a-brief-history-of-moes) regarding MoEs for more info. 

## Software Setuph

### Operating System
I use Ubuntu for my local AI workstation as Linux currently has much better ROCm (AMD Drivers for highly performant computing on GPUs) than Windows. However Windows support for ROCm has drastically improved lately, if you are willing to go through a slightly more complicated setup it is now quite suitable for your at home AMD AI lab. MAC OS is also a suitable choice for at home AI if you a MAC with an M series processor and enough unified RAM to run the models you are interested in using. 


### Key Software Stack
- **[Ubuntu Linux](https://ubuntu.com/)** The operating system hosting the AI inference engine and development tools.
- **[AMD ROCm/HIP](https://rocmdocs.amd.com/projects/HIP/en/latest/what_is_hip.html?utm_source=chatgpt.com)**  AMD's GPU compute platform, allowing AI workloads to efficiently make use of the AMD hardware. 
- **[llamma.cpp](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)** The open source inference engine. I compiled it targeting ROCm and the 7900XTX that I have. 
- **[Qwen3-Coder GGUF](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct?utm_source=chatgpt.com)** The open weight inference model. It was chosen as it can fit nicely on my 24GB VRAM GPU, and should be able to provide a real boost to my coding productivity. 


### Software Architecture

```mermaid
flowchart TD
    A["User / Terminal"] --> B["llama-server"]
    B --> C["llama.cpp"]
    C --> D["ROCm / HIP"]
    D --> E["AMD RX 7900 XTX"]
    F["Qwen3-Coder GGUF"] --> C
```

### Next Steps

Finally, with all of the prerequisite software installed, I was ready to set up Qwen3 Coder and start using it. A process I'll detail in my next post. 