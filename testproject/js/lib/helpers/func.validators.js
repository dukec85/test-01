/**
 * Copyright (c) 2015, AISystemsDesign, aisystemsdesign.com
 * All rights reserved.
 *
 * Validator Functions Library - version 1.0.1
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *	* Redistributions of source code must retain the above copyright
 *	  notice, this list of conditions and the following disclaimer.
 *
 *	* Redistributions in binary form must reproduce the above
 *	  copyright notice, this list of conditions and the following
 *	  disclaimer in the documentation and/or other materials provided
 *	  with the distribution.
 *
 *	* Neither the names of AISystemsDesign or aisystemsdesign.com, nor
 *	  the names of its contributors may be used to endorse or promote
 *	  products derived from this software without specific prior
 *	  written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */

/*
 * This is a BSD License approved by the Open Source Initiative (OSI).
 * See:  http://www.opensource.org/licenses/bsd-license.php
 */

if(!String.prototype.trim)
{
  String.prototype.trim = function()
  {
    return this.replace(/^\s+|\s+$/g,'');
  }
}
// Begin Validation Functions --------------------------------------------------
function valRequired(data)
{
  if(data.value.trim().length < 1)
  {
    return false;
  }
  return true;
}

function valEmail(data)
{
  var empos1 = data.value.trim().indexOf("@");
  var empos2 = data.value.trim().lastIndexOf(".");
  if(empos1 < 1 || empos2 < empos1+2 || empos2+2 >= data.value.trim().length)
  {
    return false;
  }
  return true;
}

function valNumeric(data)
{
  var numericvalue = data.value.trim();
  if(numericvalue.length > 0)
  {
    var allowed = '0123456789';
    for(var i = 0; i < numericvalue.length; i++)
    {
      if(allowed.indexOf(numericvalue.charAt(i)) == -1)
      {
        return false;
      }
    }
  }
  return true;
}

function valCharLen(data)
{
  if(data.value.trim().length > 0)
  {
    if(data.type == 'range')
    {
      if(data.value.trim().length < data.min || data.value.trim().length > data.max)
      {
        return false;
      }
    }
    if(data.type == 'enum')
    {
      var tmpstatus = false;
      for(var i = 0; i < data.list.length; i++)
      {
        if(data.list[i] == data.value.length)
        {
          tmpstatus = true;
          i = data.list.length;
        }
      }
      return tmpstatus;
    }
  }
  return true;
}

function valEnum(data)
{
  var value = data.value.trim();
  if(value.length > 0)
  {
    var tmpstatus = false;
    for(var i = 0; i < data.list.length; i++)
    {
      if(data.list[i] == value)
      {
        tmpstatus = true;
        i = data.list.length;
      }
    }
  }
  return tmpstatus;
}

function valForbid(data)
{
  var spchars = '~`!#$%^&*+=-[]\\\';,/{}|\":<>?';
  if(data.fvalues.length >= 1)
  {
    spchars = data.fvalues;
  }
  for(var i = 0; i < data.value.length; i++)
  {
    if(spchars.indexOf(data.value.charAt(i)) != -1)
    {
      return false;
    }
  }
  return true;
}
// End Validation Functions ----------------------------------------------------
